'use client';

import { Card, Title, Text, Grid, Col, Metric, LineChart } from '@tremor/react';

interface ProductivityData {
  current: {
    wRVUs: number;
    encounters: number;
    collectionsPerRVU: number;
  };
  trend: Array<{
    period: string;
    wRVUs: number;
    encounters: number;
  }>;
  benchmark: {
    wRVUs: number;
    percentile: number;
  };
}

export default function ProductivityReport({ data }: { data: ProductivityData }) {
  return (
    <Card>
      <Title>Productivity Analysis</Title>
      
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-4 mt-4">
        <Col>
          <Text>Total wRVUs</Text>
          <Metric>{data.current.wRVUs.toLocaleString()}</Metric>
          <Text className="mt-2">
            {data.current.wRVUs > data.benchmark.wRVUs ? 'Above' : 'Below'} Benchmark
          </Text>
        </Col>
        <Col>
          <Text>Patient Encounters</Text>
          <Metric>{data.current.encounters.toLocaleString()}</Metric>
        </Col>
        <Col>
          <Text>Collections per RVU</Text>
          <Metric>${data.current.collectionsPerRVU.toFixed(2)}</Metric>
        </Col>
      </Grid>

      <div className="mt-8">
        <Title>Productivity Trends</Title>
        <LineChart
          className="mt-4 h-72"
          data={data.trend}
          index="period"
          categories={['wRVUs', 'encounters']}
          colors={['blue', 'green']}
          valueFormatter={(number) => number.toLocaleString()}
          yAxisWidth={60}
        />
      </div>
    </Card>
  );
}