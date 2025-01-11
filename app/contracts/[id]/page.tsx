'use client';

import { useState } from 'react';
import { Card, Title, Text, Grid, Metric, Button, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@tremor/react';

export default function ContractPage({ params }: { params: { id: string } }) {
  const [contract] = useState({
    id: '1',
    provider: {
      id: '1',
      name: 'John Doe',
      specialty: 'Cardiology',
      type: 'PHYSICIAN'
    },
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'Active',
    terms: [
      { type: 'base', amount: 250000, frequency: 'annual' },
      { type: 'wRVU', amount: 45, frequency: 'annual', threshold: 4500 },
      { type: 'quality', amount: 25000, frequency: 'annual', metrics: ['patient satisfaction', 'quality measures'] }
    ]
  });

  const calculateAnnualValue = () => {
    return contract.terms.reduce((total, term) => {
      if (term.type === 'base') return total + term.amount;
      if (term.type === 'quality') return total + term.amount;
      return total;
    }, 0);
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="md:flex md:justify-between md:items-center mb-6">
        <div>
          <Title>Contract Details</Title>
          <Text>Contract for {contract.provider.name}</Text>
        </div>
        <div className="mt-4 md:mt-0 space-x-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.location.href = `/providers/${contract.provider.id}`}
          >
            View Provider
          </Button>
          <Button
            size="sm"
            onClick={() => window.location.href = `/contracts/${contract.id}/edit`}
          >
            Edit Contract
          </Button>
        </div>
      </div>

      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card>
          <Text>Contract Status</Text>
          <Metric>{contract.status}</Metric>
          <Text className="mt-2">
            {new Date(contract.startDate).toLocaleDateString()} - {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Ongoing'}
          </Text>
        </Card>

        <Card>
          <Text>Annual Base Value</Text>
          <Metric>${calculateAnnualValue().toLocaleString()}</Metric>
          <Text className="mt-2">Base + Quality Incentives</Text>
        </Card>

        <Card>
          <Text>wRVU Rate</Text>
          <Metric>${contract.terms.find(t => t.type === 'wRVU')?.amount || 0}/wRVU</Metric>
          <Text className="mt-2">Above {contract.terms.find(t => t.type === 'wRVU')?.threshold.toLocaleString()} wRVUs</Text>
        </Card>
      </Grid>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Compensation Terms</Tab>
          <Tab>Quality Metrics</Tab>
          <Tab>Payment Schedule</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Card>
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
                    {contract.terms.map((term, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">{term.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${term.amount.toLocaleString()}
                          {term.type === 'wRVU' && ' per wRVU'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">{term.frequency}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {term.type === 'wRVU' && `Threshold: ${term.threshold.toLocaleString()} wRVUs`}
                          {term.type === 'quality' && (
                            <ul className="list-disc list-inside">
                              {term.metrics.map((metric, i) => (
                                <li key={i} className="capitalize">{metric}</li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card>
              <Title>Quality Metrics and Targets</Title>
              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap">Patient Satisfaction</td>
                      <td className="px-6 py-4 whitespace-nowrap">≥ 90%</td>
                      <td className="px-6 py-4 whitespace-nowrap">92%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-600">On Track</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">Quality Measures</td>
                      <td className="px-6 py-4 whitespace-nowrap">≥ 85%</td>
                      <td className="px-6 py-4 whitespace-nowrap">83%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-yellow-600">At Risk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card>
              <Title>Payment Schedule</Title>
              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap">Base Salary</td>
                      <td className="px-6 py-4 whitespace-nowrap">Monthly</td>
                      <td className="px-6 py-4 whitespace-nowrap">Feb 1, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">${(250000 / 12).toLocaleString()}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">wRVU Bonus</td>
                      <td className="px-6 py-4 whitespace-nowrap">Quarterly</td>
                      <td className="px-6 py-4 whitespace-nowrap">Apr 1, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">Variable</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap">Quality Bonus</td>
                      <td className="px-6 py-4 whitespace-nowrap">Annual</td>
                      <td className="px-6 py-4 whitespace-nowrap">Jan 1, 2026</td>
                      <td className="px-6 py-4 whitespace-nowrap">Up to $25,000</td>
                    </tr>
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