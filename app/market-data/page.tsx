'use client';

import { useState } from 'react';
import { Card, Title, Text, Button, Select, SelectItem } from '@tremor/react';
import { BarChart } from '@tremor/react';

export default function MarketDataPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('compensation');
  const [selectedYear, setSelectedYear] = useState('2025');

  const specialties = [
    'Cardiology',
    'Internal Medicine',
    'Family Medicine',
    'Surgery',
    'Pediatrics',
    'Orthopedics'
  ];

  const metrics = [
    { value: 'compensation', label: 'Total Compensation' },
    { value: 'wRVUs', label: 'Work RVUs' },
    { value: 'collections', label: 'Collections' },
    { value: 'compensation_per_wRVU', label: 'Compensation per wRVU' }
  ];

  const marketData = [
    {
      specialty: 'Cardiology',
      compensation: {
        p25: 400000,
        p50: 500000,
        p75: 600000,
        p90: 700000
      },
      wRVUs: {
        p25: 7500,
        p50: 8500,
        p75: 9500,
        p90: 10500
      }
    },
    // Add more specialties
  ];

  const handleImportData = () => {
    // Import functionality
  };

  const getChartData = () => {
    const data = marketData.find(d => d.specialty === selectedSpecialty);
    if (!data) return [];

    const metricData = data[selectedMetric as keyof typeof data];
    return [
      { percentile: '25th', value: metricData.p25 },
      { percentile: '50th', value: metricData.p50 },
      { percentile: '75th', value: metricData.p75 },
      { percentile: '90th', value: metricData.p90 }
    ];
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="md:flex md:justify-between md:items-center mb-6">
        <div>
          <Title>Market Data</Title>
          <Text>Compare compensation and productivity against market benchmarks</Text>
        </div>
        <Button onClick={handleImportData}>Import Market Data</Button>
      </div>

      <Card className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select
            value={selectedSpecialty}
            onValueChange={setSelectedSpecialty}
            placeholder="Select Specialty"
          >
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </Select>

          <Select
            value={selectedMetric}
            onValueChange={setSelectedMetric}
            placeholder="Select Metric"
          >
            {metrics.map((metric) => (
              <SelectItem key={metric.value} value={metric.value}>
                {metric.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
            placeholder="Select Year"
          >
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </Select>
        </div>

        {selectedSpecialty && selectedMetric && (
          <>
            <Title>Market Distribution</Title>
            <BarChart
              className="mt-4 h-80"
              data={getChartData()}
              index="percentile"
              categories={['value']}
              colors={['blue']}
              valueFormatter={(value) => 
                selectedMetric === 'compensation' 
                  ? `$${value.toLocaleString()}`
                  : value.toLocaleString()
              }
            />
          </>
        )}
      </Card>

      <Card className="mt-6">
        <Title>Market Data Details</Title>
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">25th Percentile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Median</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">75th Percentile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">90th Percentile</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((data, index) => (
                <tr key={data.specialty} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">{data.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${data[selectedMetric as keyof typeof data].p25.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${data[selectedMetric as keyof typeof data].p50.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${data[selectedMetric as keyof typeof data].p75.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${data[selectedMetric as keyof typeof data].p90.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}