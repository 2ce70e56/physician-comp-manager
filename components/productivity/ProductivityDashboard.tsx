'use client';

import { Card, Title, Grid, Text } from '@tremor/react';
import { ProductivityChart } from './ProductivityChart';
import { ProductivityMetrics } from './ProductivityMetrics';
import { ProductivityComparison } from './ProductivityComparison';

interface ProductivityDashboardProps {
  providerId: string;
  data: {
    wRVUs: number[];
    encounters: number[];
    periods: string[];
    benchmarks: {
      p25: number;
      p50: number;
      p75: number;
    };
  };
}

export default function ProductivityDashboard({ providerId, data }: ProductivityDashboardProps) {
  return (
    <div className="space-y-6">
      <Card>
        <Title>Productivity Overview</Title>
        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
          <ProductivityMetrics 
            wRVUs={data.wRVUs[data.wRVUs.length - 1]}
            encounters={data.encounters[data.encounters.length - 1]}
            benchmarks={data.benchmarks}
          />
        </Grid>
      </Card>

      <Card>
        <Title>Productivity Trends</Title>
        <ProductivityChart 
          data={{
            wRVUs: data.wRVUs,
            periods: data.periods
          }}
        />
      </Card>

      <Card>
        <Title>Benchmark Comparison</Title>
        <ProductivityComparison 
          providerId={providerId}
          currentWRVUs={data.wRVUs[data.wRVUs.length - 1]}
          benchmarks={data.benchmarks}
        />
      </Card>
    </div>
  );
}