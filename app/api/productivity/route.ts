import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

export async function GET(req: Request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { searchParams } = new URL(req.url);
  const providerId = searchParams.get('providerId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!providerId || !startDate || !endDate) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const productivity = await prisma.productivity.findMany({
      where: {
        providerId,
        period: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      },
      orderBy: {
        period: 'asc'
      }
    });

    return NextResponse.json(productivity);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch productivity data' },
      { status: 500 }
    );
  }
}