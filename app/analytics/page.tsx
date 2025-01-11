'use client';

import { useState } from 'react';
import { Card, Title, Text, BarChart, DonutChart, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@tremor/react';

export default function AnalyticsPage() {
  const [selectedView, setSelectedView] = useState(0);

  const compensationData = [
    { specialty: 'Cardiology', amount: 450000 },
    { specialty: 'Internal Medicine', amount: 250000 },
    { specialty: 'Family Medicine', amount: 230000 },
    { specialty: 'Surgery', amount: 500000 },
    { specialty: 'Pediatrics', amount: 225000 }
  ];

  const productivityData = [
    { specialty: 'Cardiology', wRVUs: 8500 },
    { specialty: 'Internal Medicine', wRVUs: 5200 },
    { specialty: 'Family Medicine', wRVUs: 4800 },
    { specialty: 'Surgery', wRVUs: 9200 },
    { specialty: 'Pediatrics', wRVUs: 4600 }
  ];

  const providerTypeData = [
    { type: 'Physician', count: 25 },
    { type: 'NP', count: 12 },
    { type: 'PA', count: 8 }
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Analytics Dashboard</Title>
      <Text>Comprehensive view of compensation and productivity metrics.</Text>

      <TabGroup className="mt-6" onIndexChange={setSelectedView}>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Compensation</Tab>
          <Tab>Productivity</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <Title>Provider Distribution</Title>
                <DonutChart
                  className="mt-6"
                  data={providerTypeData}
                  category="count"
                  index="type"
                  colors={['blue', 'cyan', 'indigo']}
                />
              </Card>

              <Card>
                <Title>Average Compensation by Specialty</Title>
                <BarChart
                  className="mt-6"
                  data={compensationData}
                  index="specialty"
                  categories={['amount']}
                  colors={['blue']}
                  valueFormatter={(number) => `$${number.toLocaleString()}`}
                />
              </Card>
            </div>
          </TabPanel>

          <TabPanel>
            <Card className="mt-6">
              <Title>Detailed Compensation Analysis</Title>
              <BarChart
                className="mt-6 h-72"
                data={compensationData}
                index="specialty"
                categories={['amount']}
                colors={['blue']}
                valueFormatter={(number) => `$${number.toLocaleString()}`}
              />
            </Card>
          </TabPanel>

          <TabPanel>
            <Card className="mt-6">
              <Title>Productivity Metrics</Title>
              <BarChart
                className="mt-6 h-72"
                data={productivityData}
                index="specialty"
                categories={['wRVUs']}
                colors={['green']}
                valueFormatter={(number) => number.toLocaleString()}
              />
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}