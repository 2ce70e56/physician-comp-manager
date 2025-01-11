'use client';

import { useState } from 'react';
import { Card, Title, TabGroup, TabList, Tab, TabPanels, TabPanel, Grid } from '@tremor/react';
import { CompensationAnalytics } from './CompensationAnalytics';
import { ProductivityAnalytics } from './ProductivityAnalytics';
import { MarketComparison } from './MarketComparison';

export default function AnalyticsDashboard({ organizationId }: { organizationId: string }) {
  const [selectedView, setSelectedView] = useState(0);

  return (
    <div className="space-y-6">
      <Card>
        <Title>Organization Analytics</Title>
        <TabGroup index={selectedView} onIndexChange={setSelectedView}>
          <TabList className="mt-4">
            <Tab>Compensation</Tab>
            <Tab>Productivity</Tab>
            <Tab>Market Position</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CompensationAnalytics organizationId={organizationId} />
            </TabPanel>

            <TabPanel>
              <ProductivityAnalytics organizationId={organizationId} />
            </TabPanel>

            <TabPanel>
              <MarketComparison organizationId={organizationId} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
}