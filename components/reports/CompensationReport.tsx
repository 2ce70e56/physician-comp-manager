'use client';

import { Card, Title, Text, Grid, Col, Metric, BarChart, DonutChart } from '@tremor/react';

interface CompensationData {
  base: number;
  productivity: number;
  quality: number;
  total: number;
  marketComparison: {
    percentile: number;
    benchmark: number;
  };
}

export default function CompensationReport({ data }: { data: CompensationData }) {
  const breakdownData = [
    { name: 'Base', value: data.base },
    { name: 'Productivity', value: data.productivity },
    { name: 'Quality', value: data.quality }
  ];

  return (
    <Card>
      <Title>Compensation Analysis</Title>
      
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4 mt-4">
        <Col>
          <Text>Total Compensation</Text>
          <Metric>${data.total.toLocaleString()}</Metric>
        </Col>
        <Col>
          <Text>Market Percentile</Text>
          <Metric>{data.marketComparison.percentile}%</Metric>
        </Col>
        <Col>
          <Text>vs Benchmark</Text>
          <Metric>
            {((data.total - data.marketComparison.benchmark) / 
              data.marketComparison.benchmark * 100).toFixed(1)}%
          </Metric>
        </Col>
      </Grid>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Title>Compensation Breakdown</Title>
          <DonutChart
            className="mt-4 h-48"
            data={breakdownData}
            category="value"
            index="name"
            valueFormatter={(number) => `$${number.toLocaleString()}`}
            colors={['blue', 'cyan', 'indigo']}
          />
        </Card>
        
        <Card>
          <Title>Component Analysis</Title>
          <BarChart
            className="mt-4 h-48"
            data={breakdownData}
            index="name"
            categories={['value']}
            colors={['blue']}
            valueFormatter={(number) => `$${number.toLocaleString()}`}
          />
        </Card>
      </div>
    </Card>
  );
}