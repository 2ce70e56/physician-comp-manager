import { NextResponse } from 'next/server';
import sql from 'mssql';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { server, database, username, password, startDate, endDate } = await req.json();

    // Configure SQL connection
    const config = {
      user: username,
      password: password,
      server: server,
      database: database,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    };

    // Create connection pool
    const pool = await sql.connect(config);

    // Query to fetch productivity data
    const result = await pool.request()
      .input('startDate', sql.Date, new Date(startDate))
      .input('endDate', sql.Date, new Date(endDate))
      .query(`
        SELECT 
          p.ProviderID,
          p.FirstName + ' ' + p.LastName as ProviderName,
          pd.DateOfService,
          SUM(pd.wRVUs) as TotalWRVUs,
          COUNT(DISTINCT pd.PatientID) as Encounters,
          SUM(pd.Collections) as TotalCollections
        FROM Providers p
        JOIN ProductivityData pd ON p.ProviderID = pd.ProviderID
        WHERE pd.DateOfService BETWEEN @startDate AND @endDate
        GROUP BY p.ProviderID, p.FirstName, p.LastName, pd.DateOfService
        ORDER BY pd.DateOfService DESC
      `);

    // Transform and store the data
    const transformedData = [];
    for (const row of result.recordset) {
      const provider = await prisma.provider.findFirst({
        where: {
          npi: row.ProviderID.toString()
        }
      });

      if (provider) {
        await prisma.productivity.create({
          data: {
            providerId: provider.id,
            period: row.DateOfService,
            wRVUs: row.TotalWRVUs,
            encounters: row.Encounters,
            collections: row.TotalCollections
          }
        });

        transformedData.push({
          providerId: provider.id,
          providerName: row.ProviderName,
          period: row.DateOfService,
          wRVUs: row.TotalWRVUs,
          encounters: row.Encounters,
          collections: row.TotalCollections
        });
      }
    }

    // Close the connection
    await pool.close();

    return NextResponse.json({
      success: true,
      message: 'Data imported successfully',
      previewData: transformedData.slice(0, 10)
    });

  } catch (error) {
    console.error('SQL Import Error:', error);
    return NextResponse.json(
      { error: 'Failed to import data from SQL Server' },
      { status: 500 }
    );
  }
}

// Helper function to validate SQL connection
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const server = searchParams.get('server');
    const database = searchParams.get('database');
    const username = searchParams.get('username');
    const password = searchParams.get('password');

    if (!server || !database || !username || !password) {
      return NextResponse.json(
        { error: 'Missing connection parameters' },
        { status: 400 }
      );
    }

    const config = {
      user: username,
      password: password,
      server: server,
      database: database,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    };

    // Test connection
    const pool = await sql.connect(config);
    await pool.request().query('SELECT 1');
    await pool.close();

    return NextResponse.json({
      success: true,
      message: 'Connection successful'
    });

  } catch (error) {
    console.error('SQL Connection Test Error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to SQL Server' },
      { status: 500 }
    );
  }
}