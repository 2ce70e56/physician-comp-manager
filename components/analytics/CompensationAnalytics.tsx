'use client';

import { Card, Title, BarChart, Grid } from '@tremor/react';
import { useState, useEffect } from 'react';

interface CompensationData {
  specialty: string;
  averageCompensation: number;
  providers: number;
}

export function CompensationAnalytics({ organizationId }: { organizationId: string }) {
  const [data, setData] = useState<CompensationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/analytics/compensation?organizationId=${organizationId}`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [organizationId]);

  return (
    <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
      <Card>
        <Title>Average Compensation by Specialty</Title>
        <BarChart
          className="mt-4"
          data={data}
          index="specialty"
          categories={["averageCompensation"]}
          colors={["blue"]}
        />
      </Card>
    </Grid>
  );
}