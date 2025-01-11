import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { calculateAnalytics } from '@/lib/analytics/calculations';

export async function GET(req: Request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { searchParams } = new URL(req.url);
  const organizationId = searchParams.get('organizationId');
  const startDate = searchParams.get('startDate') || new Date(new Date().getFullYear(), 0, 1).toISOString();
  const endDate = searchParams.get('endDate') || new Date().toISOString();

  try {
    const providers = await prisma.provider.findMany({
      where: { organizationId: organizationId! },
      include: {
        contracts: true,
        productivity: {
          where: {
            period: {
              gte: new Date(startDate),
              lte: new Date(endDate)
            }
          }
        },
        compensations: {
          where: {
            period: {
              gte: new Date(startDate),
              lte: new Date(endDate)
            }
          }
        }
      }
    });

    const analytics = calculateAnalytics(providers);
    
    return NextResponse.json(analytics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}