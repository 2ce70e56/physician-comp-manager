'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

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
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>Analytics Dashboard</PageHeaderHeading>
            <PageHeaderDescription>
              Comprehensive view of compensation and productivity metrics.
            </PageHeaderDescription>
          </div>
        </PageHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="compensation">Compensation</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Providers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{providerTypeData.reduce((sum, data) => sum + data.count, 0)}</div>
                    <div className="flex gap-2 mt-2">
                      {providerTypeData.map(data => (
                        <Badge key={data.type} variant="secondary">
                          {data.type}: {data.count}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Compensation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ${(compensationData.reduce((sum, data) => sum + data.amount, 0) / compensationData.length).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average wRVUs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {(productivityData.reduce((sum, data) => sum + data.wRVUs, 0) / productivityData.length).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Compensation by Specialty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {compensationData.map(data => (
                        <div key={data.specialty} className="flex justify-between items-center">
                          <div>{data.specialty}</div>
                          <div className="font-semibold">${data.amount.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Productivity by Specialty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {productivityData.map(data => (
                        <div key={data.specialty} className="flex justify-between items-center">
                          <div>{data.specialty}</div>
                          <div className="font-semibold">{data.wRVUs.toLocaleString()} wRVUs</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compensation">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Detailed Compensation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {compensationData.map(data => (
                    <div key={data.specialty} className="flex flex-col">
                      <div className="flex justify-between mb-2">
                        <span>{data.specialty}</span>
                        <span className="font-semibold">${data.amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ 
                            width: `${(data.amount / Math.max(...compensationData.map(d => d.amount))) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="productivity">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Productivity Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {productivityData.map(data => (
                    <div key={data.specialty} className="flex flex-col">
                      <div className="flex justify-between mb-2">
                        <span>{data.specialty}</span>
                        <span className="font-semibold">{data.wRVUs.toLocaleString()} wRVUs</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ 
                            width: `${(data.wRVUs / Math.max(...productivityData.map(d => d.wRVUs))) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>
    </Container>
  );
}