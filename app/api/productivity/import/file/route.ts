import { NextResponse } from 'next/server';
import { parse } from 'papaparse';
import * as XLSX from 'xlsx';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    let data: any[] = [];

    // Handle different file types
    if (file.name.endsWith('.csv')) {
      const csvText = new TextDecoder().decode(fileBuffer);
      const result = parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      });
      data = result.data;
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const workbook = XLSX.read(fileBuffer, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(worksheet);
    } else {
      return NextResponse.json(
        { error: 'Unsupported file format' },
        { status: 400 }
      );
    }

    // Validate and transform data
    const transformedData = [];
    for (const row of data) {
      // Validate required fields
      if (!row.ProviderID || !row.Date || !row.wRVUs) {
        continue;
      }

      const provider = await prisma.provider.findFirst({
        where: {
          npi: row.ProviderID.toString()
        }
      });

      if (provider) {
        const productivityData = {
          providerId: provider.id,
          period: new Date(row.Date),
          wRVUs: parseFloat(row.wRVUs),
          encounters: parseInt(row.Encounters || '0'),
          collections: parseFloat(row.Collections || '0')
        };

        await prisma.productivity.create({
          data: productivityData
        });

        transformedData.push({
          ...productivityData,
          providerName: `${provider.firstName} ${provider.lastName}`
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${transformedData.length} records successfully`,
      previewData: transformedData.slice(0, 10)
    });

  } catch (error) {
    console.error('File Import Error:', error);
    return NextResponse.json(
      { error: 'Failed to import data from file' },
      { status: 500 }
    );
  }
}