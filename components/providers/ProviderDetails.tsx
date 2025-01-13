'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export default function ProviderPage({ params }: { params: { id: string } }) {
  const [provider] = useState({
    id: params.id,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    status: 'active',
    location: 'Main Campus',
    startDate: '2020-01-15',
    contractType: 'Production',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567'
  });

  const productivityData = [
    { month: 'Jan', wRVUs: 420, benchmark: 400 },
    { month: 'Feb', wRVUs: 380, benchmark: 400 },
    { month: 'Mar', wRVUs: 450, benchmark: 400 },
    { month: 'Apr', wRVUs: 410, benchmark: 400 },
    { month: 'May', wRVUs: 440, benchmark: 400 },
    { month: 'Jun', wRVUs: 425, benchmark: 400 }
  ];

  const wRVUsByType = [
    { category: 'Office Visits', value: 1200 },
    { category: 'Procedures', value: 800 },
    { category: 'Hospital Services', value: 500 },
    { category: 'Consultations', value: 300 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'destructive';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Container>
      <PageHeader>
        <div className="flex justify-between items-start">
          <div>
            <PageHeaderHeading>{provider.name}</PageHeaderHeading>
            <PageHeaderDescription>
              Provider details and performance metrics
            </PageHeaderDescription>
          </div>
          <Badge variant={getStatusColor(provider.status)}>
            {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
          </Badge>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Provider Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Specialty</span>
                  <span>{provider.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span>{provider.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Start Date</span>
                  <span>{new Date(provider.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Contract Type</span>
                  <span>{provider.contractType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span>{provider.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span>{provider.phone}</span>
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
                  <span className="text-sm text-muted-foreground">Benchmark wRVUs</span>
                  <span>2,400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">% of Benchmark</span>
                  <span>105%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">YTD Collections</span>
                  <span>{formatCurrency(450000)}</span>
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
                <TabsTrigger value="productivity">Monthly Productivity</TabsTrigger>
                <TabsTrigger value="breakdown">wRVU Breakdown</TabsTrigger>
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
                      <Line type="monotone" dataKey="benchmark" stroke="#16a34a" name="Benchmark" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="breakdown" className="space-y-4">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={wRVUsByType} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#2563eb" name="wRVUs" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Section>
    </Container>
  );
}