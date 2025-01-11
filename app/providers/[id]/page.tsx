'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Grid, Metric, ProgressBar, TabGroup, TabList, Tab, TabPanels, TabPanel, Button } from '@tremor/react';
import { LineChart, BarChart } from '@tremor/react';

interface ProviderData {
  id: string;
  firstName: string;
  lastName: string;
  type: string;
  specialty: string;
  npi: string;
  contracts: any[];
  productivity: any[];
}

export default function ProviderPage({ params }: { params: { id: string } }) {
  const [provider, setProvider] = useState<ProviderData>({ 
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    type: 'PHYSICIAN',
    specialty: 'Cardiology',
    npi: '1234567890',
    contracts: [
      {
        id: '1',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        terms: [
          { type: 'base', amount: 250000, frequency: 'annual' },
          { type: 'wRVU', amount: 45, frequency: 'annual', threshold: 4500 }
        ]
      }
    ],
    productivity: [
      { period: '2025-01', wRVUs: 450, encounters: 200 },
      { period: '2025-02', wRVUs: 475, encounters: 210 },
      { period: '2025-03', wRVUs: 425, encounters: 190 }
    ]
  });

  const [selectedView, setSelectedView] = useState(0);

  const productivityData = provider.productivity.map(p => ({
    date: p.period,
    "wRVUs": p.wRVUs,
    "Encounters": p.encounters
  }));

  const currentContract = provider.contracts[provider.contracts.length - 1];
  const totalCompensation = currentContract.terms.reduce((sum: number, term: any) => {
    if (term.type === 'base') return sum + term.amount;
    return sum;
  }, 0);

  // Calculate YTD metrics
  const ytdWRVUs = provider.productivity.reduce((sum, p) => sum + p.wRVUs, 0);
  const ytdEncounters = provider.productivity.reduce((sum, p) => sum + p.encounters, 0);
  const wRVUTarget = 6000; // Example target
  const wRVUProgress = (ytdWRVUs / wRVUTarget) * 100;

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mb-6">
        <div className="md:flex md:justify-between md:items-center">
          <div>
            <Title>{`${provider.firstName} ${provider.lastName}`}</Title>
            <Text>{provider.specialty}</Text>
            <Text className="text-gray-500">{provider.type}</Text>
            {provider.npi && <Text className="text-gray-500">NPI: {provider.npi}</Text>}
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => window.location.href = `/providers/${provider.id}/edit`}
            >
              Edit Provider
            </Button>
          </div>
        </div>
      </Card>

      <TabGroup onIndexChange={setSelectedView}>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Productivity</Tab>
          <Tab>Compensation</Tab>
          <Tab>Contracts</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                <Text>Annual Compensation</Text>
                <Metric>${totalCompensation.toLocaleString()}</Metric>
                <Text className="mt-2">Base + Variable</Text>
              </Card>

              <Card>
                <Text>YTD wRVUs</Text>
                <Metric>{ytdWRVUs.toLocaleString()}</Metric>
                <div className="mt-2">
                  <Text>{`Progress to Target: ${Math.round(wRVUProgress)}%`}</Text>
                  <ProgressBar value={wRVUProgress} className="mt-2" />
                </div>
              </Card>

              <Card>
                <Text>YTD Encounters</Text>
                <Metric>{ytdEncounters.toLocaleString()}</Metric>
                <Text className="mt-2">Avg: {Math.round(ytdEncounters / provider.productivity.length)} per month</Text>
              </Card>
            </Grid>

            <Card className="mt-6">
              <Title>Productivity Trends</Title>
              <LineChart
                className="mt-4 h-72"
                data={productivityData}
                index="date"
                categories={["wRVUs", "Encounters"]}
                colors={["blue", "green"]}
                yAxisWidth={40}
                valueFormatter={(value: number) => value.toLocaleString()}
              />
            </Card>
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              <Card>
                <Title>Monthly wRVUs</Title>
                <BarChart
                  className="mt-4 h-72"
                  data={productivityData}
                  index="date"
                  categories={["wRVUs"]}
                  colors={["blue"]}
                  yAxisWidth={40}
                  valueFormatter={(value: number) => value.toLocaleString()}
                />
              </Card>

              <Card>
                <Title>Monthly Encounters</Title>
                <BarChart
                  className="mt-4 h-72"
                  data={productivityData}
                  index="date"
                  categories={["Encounters"]}
                  colors={["green"]}
                  yAxisWidth={40}
                  valueFormatter={(value: number) => value.toLocaleString()}
                />
              </Card>
            </Grid>

            <Card className="mt-6">
              <Title>Productivity Details</Title>
              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">wRVUs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Encounters</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">wRVUs/Encounter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {provider.productivity.map((p: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">{p.period}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{p.wRVUs.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{p.encounters.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(p.wRVUs / p.encounters).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card className="mt-6">
              <Title>Compensation Structure</Title>
              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentContract.terms.map((term: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">{term.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${term.amount.toLocaleString()}
                          {term.type === 'wRVU' && ' per wRVU'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">{term.frequency}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {term.type === 'wRVU' && `Threshold: ${term.threshold.toLocaleString()} wRVUs`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card className="mt-6">
              <Title>Contract History</Title>
              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {provider.contracts.map((contract: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(contract.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Ongoing'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(contract.endDate) > new Date() ? 'Active' : 'Expired'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            size="xs"
                            variant="secondary"
                            onClick={() => window.location.href = `/contracts/${contract.id}`}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}