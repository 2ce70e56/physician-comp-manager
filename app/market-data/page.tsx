'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Market Data</h1>
          <p className="text-muted-foreground">
            Compare compensation and productivity against market benchmarks
          </p>
        </div>
        <Button onClick={handleImportData}>Import Market Data</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                {metrics.map((metric) => (
                  <SelectItem key={metric.value} value={metric.value}>
                    {metric.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedSpecialty && selectedMetric && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Market Distribution</h2>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="percentile" />
                    <YAxis
                      tickFormatter={(value) => 
                        selectedMetric === 'compensation' 
                          ? `$${value.toLocaleString()}`
                          : value.toLocaleString()
                      }
                    />
                    <Tooltip
                      formatter={(value) =>
                        selectedMetric === 'compensation' 
                          ? `$${value.toLocaleString()}`
                          : value.toLocaleString()
                      }
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#2563eb" name={metrics.find(m => m.value === selectedMetric)?.label} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Market Data Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th scope="col" className="px-6 py-3">Specialty</th>
                  <th scope="col" className="px-6 py-3">25th Percentile</th>
                  <th scope="col" className="px-6 py-3">Median</th>
                  <th scope="col" className="px-6 py-3">75th Percentile</th>
                  <th scope="col" className="px-6 py-3">90th Percentile</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((data, index) => (
                  <tr key={data.specialty} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/50'}>
                    <td className="px-6 py-4 font-medium">{data.specialty}</td>
                    <td className="px-6 py-4">
                      ${data[selectedMetric as keyof typeof data].p25.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      ${data[selectedMetric as keyof typeof data].p50.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      ${data[selectedMetric as keyof typeof data].p75.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      ${data[selectedMetric as keyof typeof data].p90.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}