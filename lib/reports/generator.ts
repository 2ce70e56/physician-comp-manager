import { prisma } from '@/lib/prisma';
import { CompensationCalculator } from '../compensation/calculator';
import { MarketDataService } from '../market-data/integration';

export class ReportGenerator {
  private compensationCalculator = new CompensationCalculator();
  private marketDataService = new MarketDataService();

  async generateProviderReport(providerId: string, period: { start: Date; end: Date }) {
    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
      include: {
        productivity: {
          where: {
            period: {
              gte: period.start,
              lte: period.end
            }
          }
        },
        contracts: true
      }
    });

    if (!provider) throw new Error('Provider not found');

    const productivity = this.calculateProductivityMetrics(provider.productivity);
    const compensation = await this.compensationCalculator.calculateCompensation({
      providerId,
      period,
      productivity: {
        wRVUs: productivity.totalWRVUs,
        encounters: productivity.totalEncounters
      }
    });

    const marketComparison = await this.getMarketComparison(
      provider.specialty,
      compensation.total,
      productivity.totalWRVUs
    );

    return {
      provider: {
        id: provider.id,
        name: `${provider.firstName} ${provider.lastName}`,
        specialty: provider.specialty,
        type: provider.type
      },
      period: {
        start: period.start,
        end: period.end
      },
      productivity: {
        wRVUs: productivity.totalWRVUs,
        encounters: productivity.totalEncounters,
        trendsData: productivity.trendsData
      },
      compensation: {
        total: compensation.total,
        breakdown: compensation.breakdown
      },
      marketComparison
    };
  }

  private calculateProductivityMetrics(productivityData: any[]) {
    const totalWRVUs = productivityData.reduce((sum, p) => sum + p.wRVUs, 0);
    const totalEncounters = productivityData.reduce((sum, p) => sum + p.encounters, 0);

    const trendsData = productivityData
      .sort((a, b) => new Date(a.period).getTime() - new Date(b.period).getTime())
      .map(p => ({
        period: p.period,
        wRVUs: p.wRVUs,
        encounters: p.encounters
      }));

    return {
      totalWRVUs,
      totalEncounters,
      trendsData
    };
  }

  private async getMarketComparison(
    specialty: string,
    compensation: number,
    wRVUs: number
  ) {
    const marketData = await this.marketDataService.getComparisonData(
      specialty,
      'compensation',
      new Date().getFullYear()
    );

    return {
      compensation: {
        value: compensation,
        percentile: this.calculatePercentile(compensation, marketData)
      },
      productivity: {
        value: wRVUs,
        percentile: this.calculatePercentile(wRVUs, marketData)
      }
    };
  }

  private calculatePercentile(value: number, marketData: any[]) {
    const sortedValues = marketData
      .map(d => d.value)
      .sort((a, b) => a - b);
    
    const position = sortedValues.findIndex(v => v >= value);
    return (position / sortedValues.length) * 100;
  }
}