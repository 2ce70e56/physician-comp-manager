'use client';

import { Card, Title, Text, Grid, Col, Metric, BarChart } from '@tremor/react';

interface MarketData {
  specialty: string;
  metrics: {
    compensation: {
      value: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
    };
    productivity: {
      value: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
    };
  };
}

export default function MarketComparisonReport({ data }: { data: MarketData }) {
  const compensationData = [
    { percentile: '25th', value: data.metrics.compensation.p25 },
    { percentile: '50th', value: data.metrics.compensation.p50 },
    { percentile: '75th', value: data.metrics.compensation.p75 },
    { percentile: '90th', value: data.metrics.compensation.p90 },
    { percentile: 'Current', value: data.metrics.compensation.value }
  ];

  const productivityData = [
    { percentile: '25th', value: data.metrics.productivity.p25 },
    { percentile: '50th', value: data.metrics.productivity.p50 },
    { percentile: '75th', value: data.metrics.productivity.p75 },
    { percentile: '90th', value: data.metrics.productivity.p90 },
    { percentile: 'Current', value: data.metrics.productivity.value }
  ];

  return (
    <Card>
      <Title>Market Comparison - {data.specialty}</Title>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Title>Compensation Percentiles</Title>
          <BarChart
            className="mt-4 h-72"
            data={compensationData}
            index="percentile"
            categories={['value']}
            colors={['blue']}
            valueFormatter={(number) => `$${number.toLocaleString()}`}
          />
        </Card>

        <Card>
          <Title>Productivity Percentiles</Title>
          <BarChart
            className="mt-4 h-72"
            data={productivityData}
            index="percentile"
            categories={['value']}
            colors={['green']}
            valueFormatter={(number) => number.toLocaleString()}
          />
        </Card>
      </div>
    </Card>
  );
}