import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

export async function GET(req: Request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { searchParams } = new URL(req.url);
  const organizationId = searchParams.get('organizationId');

  try {
    const providers = await prisma.provider.findMany({
      where: { organizationId: organizationId! },
      include: {
        contracts: true,
        productivity: true
      }
    });
    
    return NextResponse.json(providers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}