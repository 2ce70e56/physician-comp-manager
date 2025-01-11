import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSqlConnection } from '@/lib/sql-server/connection';
import { PRODUCTIVITY_QUERY } from '@/lib/sql-server/queries';
import { logger } from '@/lib/monitoring/logger';

export async function POST(req: Request) {
  try {
    const { providerId, startDate, endDate } = await req.json();

    // Connect to SQL Server
    const pool = await getSqlConnection();
    
    // Fetch productivity data
    const result = await pool.request()
      .input('providerId', providerId)
      .input('startDate', startDate)
      .input('endDate', endDate)
      .query(PRODUCTIVITY_QUERY);

    // Transform and store the data
    const productivityData = result.recordset.map(record => ({
      providerId: record.ProviderID,
      period: record.DateOfService,
      wRVUs: record.TotalwRVU,
      encounters: record.PatientCount,
      charges: record.TotalCharges
    }));

    // Store in database
    await prisma.productivity.createMany({
      data: productivityData,
      skipDuplicates: true
    });

    logger.info('Productivity sync completed', {
      providerId,
      recordCount: productivityData.length
    });

    return NextResponse.json({
      status: 'success',
      recordCount: productivityData.length
    });
  } catch (error) {
    logger.error('Productivity sync failed', {
      error: error.message,
      stack: error.stack
    });

    return NextResponse.json(
      { error: 'Failed to sync productivity data' },
      { status: 500 }
    );
  }
}