'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ContractPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [contract] = useState({
    id: params.id,
    name: 'Production Contract 2025',
    type: 'production',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    baseCompensation: 250000,
    wRVURate: 45,
    wRVUThreshold: 4800,
    status: 'active',
    provider: 'Dr. Sarah Johnson',
    specialty: 'Cardiology'
  });

  const productivityData = [
    { month: 'Jan', wRVUs: 420, target: 400 },
    { month: 'Feb', wRVUs: 380, target: 400 },
    { month: 'Mar', wRVUs: 450, target: 400 },
    { month: 'Apr', wRVUs: 410, target: 400 },
    { month: 'May', wRVUs: 440, target: 400 },
    { month: 'Jun', wRVUs: 425, target: 400 }
  ];

  const compensationData = [
    { month: 'Jan', compensation: 25000 },
    { month: 'Feb', compensation: 23500 },
    { month: 'Mar', compensation: 27000 },
    { month: 'Apr', compensation: 24800 },
    { month: 'May', compensation: 26500 },
    { month: 'Jun', compensation: 25800 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'expired':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Container>
      <PageHeader>
        <div className="flex justify-between items-start">
          <div>
            <PageHeaderHeading>{contract.name}</PageHeaderHeading>
            <PageHeaderDescription>
              Contract details and performance metrics
            </PageHeaderDescription>
          </div>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/contracts/${params.id}/edit`)}
            >
              Edit Contract
            </Button>
            <Button onClick={() => router.push('/contracts/new')}>
              New Contract
            </Button>
          </div>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={getStatusColor(contract.status)}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Provider</span>
                  <span>{contract.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Specialty</span>
                  <span>{contract.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span>{contract.type.charAt(0).toUpperCase() + contract.type.slice(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Start Date</span>
                  <span>{new Date(contract.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">End Date</span>
                  <span>{new Date(contract.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Base Compensation</span>
                  <span>{formatCurrency(contract.baseCompensation)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">wRVU Rate</span>
                  <span>${contract.wRVURate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">wRVU Threshold</span>
                  <span>{contract.wRVUThreshold.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">YTD wRVUs</span>
                  <span>2,525</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Target wRVUs</span>
                  <span>2,400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">YTD Compensation</span>
                  <span>{formatCurrency(152500)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Projected Annual</span>
                  <span>{formatCurrency(305000)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="productivity">
              <TabsList>
                <TabsTrigger value="productivity">Productivity</TabsTrigger>
                <TabsTrigger value="compensation">Compensation</TabsTrigger>
              </TabsList>
              <TabsContent value="productivity" className="space-y-4">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={productivityData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="wRVUs" stroke="#2563eb" name="Actual wRVUs" />
                      <Line type="monotone" dataKey="target" stroke="#16a34a" name="Target wRVUs" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="compensation" className="space-y-4">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={compensationData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Line type="monotone" dataKey="compensation" stroke="#2563eb" name="Monthly Compensation" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Section>
    </Container>
  );