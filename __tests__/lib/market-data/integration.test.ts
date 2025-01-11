import { MarketDataService } from '@/lib/market-data/integration';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  marketData: {
    createMany: jest.fn(),
    findMany: jest.fn()
  }
}));

describe('MarketDataService', () => {
  let service: MarketDataService;

  beforeEach(() => {
    service = new MarketDataService();
    jest.clearAllMocks();
  });

  it('imports market data successfully', async () => {
    const mockData = [
      {
        specialty: 'Cardiology',
        metric: 'compensation',
        value: 500000,
        percentile: 75,
        year: 2025,
        source: 'MGMA'
      }
    ];

    (prisma.marketData.createMany as jest.Mock).mockResolvedValue({ count: 1 });

    const result = await service.importMarketData(mockData);

    expect(result.success).toBe(true);
    expect(result.count).toBe(1);
    expect(prisma.marketData.createMany).toHaveBeenCalledWith({
      data: expect.arrayContaining([expect.objectContaining(mockData[0])]),
      skipDuplicates: true
    });
  });

  it('retrieves comparison data correctly', async () => {
    const mockMarketData = [
      {
        specialty: 'Cardiology',
        metric: 'compensation',
        value: 400000,
        percentile: 50,
        year: 2025
      },
      {
        specialty: 'Cardiology',
        metric: 'compensation',
        value: 600000,
        percentile: 75,
        year: 2025
      }
    ];

    (prisma.marketData.findMany as jest.Mock).mockResolvedValue(mockMarketData);

    const result = await service.getComparisonData('Cardiology', 'compensation', 2025);

    expect(result).toEqual(mockMarketData);
    expect(prisma.marketData.findMany).toHaveBeenCalledWith({
      where: {
        specialty: 'Cardiology',
        metric: 'compensation',
        year: 2025
      },
      orderBy: {
        percentile: 'asc'
      }
    });
  });

  it('handles import errors gracefully', async () => {
    (prisma.marketData.createMany as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(service.importMarketData([])).rejects.toThrow('Database error');
  });
});