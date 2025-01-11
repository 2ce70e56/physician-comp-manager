import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { ReportGenerator } from '@/lib/reports/generator';

export async function POST(req: Request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { providerId, startDate, endDate } = await req.json();
    
    const reportGenerator = new ReportGenerator();
    const report = await reportGenerator.generateProviderReport(
      providerId,
      {
        start: new Date(startDate),
        end: new Date(endDate)
      }
    );

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}