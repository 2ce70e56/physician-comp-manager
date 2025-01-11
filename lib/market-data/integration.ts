import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/monitoring/logger';

export class MarketDataService {
  async importMarketData(data: MarketDataImport[]) {
    try {
      const formattedData = data.map(item => ({
        specialty: item.specialty,
        metric: item.metric,
        value: item.value,
        percentile: item.percentile,
        year: item.year,
        region: item.region,
        source: item.source
      }));

      await prisma.marketData.createMany({
        data: formattedData,
        skipDuplicates: true
      });

      logger.info('Market data import completed', {
        recordCount: formattedData.length
      });

      return { success: true, count: formattedData.length };
    } catch (error) {
      logger.error('Market data import failed', {
        error: error.message
      });
      throw error;
    }
  }

  async getComparisonData(specialty: string, metric: string, year: number) {
    return await prisma.marketData.findMany({
      where: {
        specialty,
        metric,
        year
      },
      orderBy: {
        percentile: 'asc'
      }
    });
  }
}