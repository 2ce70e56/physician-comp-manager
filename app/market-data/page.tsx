'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
    {
      specialty: 'Internal Medicine',
      compensation: {
        p25: 220000,
        p50: 260000,
        p75: 300000,
        p90: 350000
      },
      wRVUs: {
        p25: 4500,
        p50: 5000,
        p75: 5500,
        p90: 6000
      }
    }
  ];

  const formatValue = (value: number) => {
    if (selectedMetric === 'compensation' || selectedMetric === 'collections') {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  return (
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>Market Data</PageHeaderHeading>
            <PageHeaderDescription>
              Compare compensation and productivity against market benchmarks
            </PageHeaderDescription>
          </div>
          <Button>Import Market Data</Button>
        </PageHeader>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Market Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
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
              <div className="space-y-6">
                {marketData
                  .filter(data => !selectedSpecialty || data.specialty === selectedSpecialty)
                  .map(data => (
                    <div key={data.specialty} className="space-y-2">
                      <h3 className="text-lg font-semibold">{data.specialty}</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">25th Percentile</span>
                          <span className="font-medium">
                            {formatValue(data[selectedMetric as keyof typeof data].p25)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Median (50th)</span>
                          <span className="font-medium">
                            {formatValue(data[selectedMetric as keyof typeof data].p50)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">75th Percentile</span>
                          <span className="font-medium">
                            {formatValue(data[selectedMetric as keyof typeof data].p75)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">90th Percentile</span>
                          <span className="font-medium">
                            {formatValue(data[selectedMetric as keyof typeof data].p90)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className="bg-primary h-full rounded-full transition-all" 
                            style={{ width: '75%' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Market Data Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Specialty</TableHead>
                  <TableHead>25th Percentile</TableHead>
                  <TableHead>Median</TableHead>
                  <TableHead>75th Percentile</TableHead>
                  <TableHead>90th Percentile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketData.map((data) => (
                  <TableRow key={data.specialty}>
                    <TableCell className="font-medium">{data.specialty}</TableCell>
                    <TableCell>
                      {formatValue(data[selectedMetric as keyof typeof data].p25)}
                    </TableCell>
                    <TableCell>
                      {formatValue(data[selectedMetric as keyof typeof data].p50)}
                    </TableCell>
                    <TableCell>
                      {formatValue(data[selectedMetric as keyof typeof data].p75)}
                    </TableCell>
                    <TableCell>
                      {formatValue(data[selectedMetric as keyof typeof data].p90)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Section>
    </Container>
  );
}