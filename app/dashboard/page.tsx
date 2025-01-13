'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const performanceData = [
    { month: 'Jan', actual: 420, target: 400, collections: 125000 },
    { month: 'Feb', actual: 380, target: 400, collections: 115000 },
    { month: 'Mar', actual: 450, target: 400, collections: 135000 },
    { month: 'Apr', actual: 410, target: 400, collections: 122000 },
    { month: 'May', actual: 440, target: 400, collections: 130000 },
    { month: 'Jun', actual: 425, target: 400, collections: 127000 }
  ];

  const specialtyDistribution = [
    { specialty: 'Family Medicine', count: 15, totalCompensation: 3750000 },
    { specialty: 'Internal Medicine', count: 12, totalCompensation: 3240000 },
    { specialty: 'Cardiology', count: 8, totalCompensation: 4000000 },
    { specialty: 'Orthopedics', count: 6, totalCompensation: 3600000 },
    { specialty: 'Pediatrics', count: 10, totalCompensation: 2500000 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Physician compensation and productivity overview
        </PageHeaderDescription>
      </PageHeader>

      <Section>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Physicians</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">51</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average wRVUs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">425</div>
              <p className="text-xs text-muted-foreground">
                +6.2% above target
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Compensation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(17090000)}</div>
              <p className="text-xs text-muted-foreground">
                +8.3% from last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">
                3 pending renewal
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Productivity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actual" stroke="#2563eb" name="Actual wRVUs" />
                    <Line type="monotone" dataKey="target" stroke="#16a34a" strokeDasharray="5 5" name="Target" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compensation by Specialty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={specialtyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="specialty" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="totalCompensation" fill="#2563eb" name="Total Compensation" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Provider Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Above Target (120%+)</span>
                  <span className="text-sm">12 providers</span>
                </div>
                <Progress value={24} className="bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">At Target (95-120%)</span>
                  <span className="text-sm">28 providers</span>
                </div>
                <Progress value={55} className="bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Below Target (&lt;95%)</span>
                  <span className="text-sm">11 providers</span>
                </div>
                <Progress value={21} className="bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    </Container>
  );
}