import { render, screen } from '@testing-library/react';
import CompensationReport from '@/components/reports/CompensationReport';

const mockData = {
  base: 200000,
  productivity: 100000,
  quality: 50000,
  total: 350000,
  marketComparison: {
    percentile: 75,
    benchmark: 300000
  }
};

describe('CompensationReport', () => {
  it('renders all compensation components', () => {
    render(<CompensationReport data={mockData} />);

    expect(screen.getByText('Compensation Analysis')).toBeInTheDocument();
    expect(screen.getByText('$350,000')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('calculates and displays benchmark comparison correctly', () => {
    render(<CompensationReport data={mockData} />);

    // 16.7% above benchmark (350000 - 300000) / 300000 * 100
    expect(screen.getByText('16.7%')).toBeInTheDocument();
  });

  it('displays all compensation breakdown categories', () => {
    render(<CompensationReport data={mockData} />);

    expect(screen.getByText('Base')).toBeInTheDocument();
    expect(screen.getByText('Productivity')).toBeInTheDocument();
    expect(screen.getByText('Quality')).toBeInTheDocument();
  });
});