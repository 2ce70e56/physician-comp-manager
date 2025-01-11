import { ReportGenerator } from '@/lib/reports/generator';
import { prisma } from '@/lib/prisma';
import { CompensationCalculator } from '@/lib/compensation/calculator';
import { MarketDataService } from '@/lib/market-data/integration';

jest.mock('@/lib/prisma');
jest.mock('@/lib/compensation/calculator');
jest.mock('@/lib/market-data/integration');

describe('ReportGenerator', () => {
  let generator: ReportGenerator;

  beforeEach(() => {
    generator = new ReportGenerator();
    jest.clearAllMocks();
  });

  it('generates provider report with all required sections', async () => {
    const mockProvider = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      specialty: 'Cardiology',
      type: 'PHYSICIAN',
      productivity: [
        {
          period: '2025-01-01',
          wRVUs: 500,
          encounters: 100
        }
      ],
      contracts: [
        {
          id: '1',
          terms: [{ type: 'base', amount: 300000 }]
        }
      ]
    };

    (prisma.provider.findUnique as jest.Mock).mockResolvedValue(mockProvider);

    const report = await generator.generateProviderReport('1', {
      start: new Date('2025-01-01'),
      end: new Date('2025-12-31')
    });

    expect(report).toHaveProperty('provider');
    expect(report).toHaveProperty('productivity');
    expect(report).toHaveProperty('compensation');
    expect(report).toHaveProperty('marketComparison');
    expect(report.provider.name).toBe('John Doe');
  });

  it('throws error when provider not found', async () => {
    (prisma.provider.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(
      generator.generateProviderReport('1', {
        start: new Date('2025-01-01'),
        end: new Date('2025-12-31')
      })
    ).rejects.toThrow('Provider not found');
  });
});