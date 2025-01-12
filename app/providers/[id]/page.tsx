'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container, PageHeader, PageHeaderHeading, Section } from '@/components/ui/layout';

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
  const [provider] = useState<ProviderData>({ 
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

  const currentContract = provider.contracts[provider.contracts.length - 1];
  const totalCompensation = currentContract.terms.reduce((sum: number, term: any) => {
    if (term.type === 'base') return sum + term.amount;
    return sum;
  }, 0);

  // Calculate metrics
  const ytdWRVUs = provider.productivity.reduce((sum, p) => sum + p.wRVUs, 0);
  const ytdEncounters = provider.productivity.reduce((sum, p) => sum + p.encounters, 0);
  const wRVUTarget = 6000;
  const wRVUProgress = (ytdWRVUs / wRVUTarget) * 100;

  return (
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>
              {provider.firstName} {provider.lastName}
            </PageHeaderHeading>
            <div className="flex items-center space-x-2 mt-2">
              <Badge>{provider.type}</Badge>
              <Badge variant="outline">{provider.specialty}</Badge>
            </div>
          </div>
          <Button variant="outline" onClick={() => window.location.href = `/providers/${provider.id}/edit`}>
            Edit Provider
          </Button>
        </PageHeader>

        <div className="grid gap-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Annual Compensation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalCompensation.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-2">Base + Variable</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>YTD wRVUs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ytdWRVUs.toLocaleString()}</div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Progress to Target: {Math.round(wRVUProgress)}%
                  </p>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div 
                      className="bg-primary h-full rounded-full transition-all" 
                      style={{ width: `${Math.min(wRVUProgress, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>YTD Encounters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ytdEncounters.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Avg: {Math.round(ytdEncounters / provider.productivity.length)} per month
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="productivity" className="mt-6">
            <TabsList>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
              <TabsTrigger value="compensation">Compensation</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
            </TabsList>

            <TabsContent value="productivity">
              <Card>
                <CardHeader>
                  <CardTitle>Productivity Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {provider.productivity.map((data, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span>{data.period}</span>
                          <span className="font-semibold">{data.wRVUs} wRVUs</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ 
                              width: `${(data.wRVUs / Math.max(...provider.productivity.map(p => p.wRVUs))) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compensation">
              <Card>
                <CardHeader>
                  <CardTitle>Compensation Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {currentContract.terms.map((term: any, index: number) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold capitalize">{term.type}</h4>
                            <p className="text-sm text-muted-foreground capitalize">{term.frequency}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              ${term.amount.toLocaleString()}
                              {term.type === 'wRVU' && ' per wRVU'}
                            </div>
                            {term.threshold && (
                              <p className="text-sm text-muted-foreground">
                                Threshold: {term.threshold.toLocaleString()} wRVUs
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contracts">
              <Card>
                <CardHeader>
                  <CardTitle>Contract History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {provider.contracts.map((contract: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">
                            {new Date(contract.startDate).toLocaleDateString()} - 
                            {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Ongoing'}
                          </div>
                          <Badge className="mt-1" variant={new Date(contract.endDate) > new Date() ? 'default' : 'secondary'}>
                            {new Date(contract.endDate) > new Date() ? 'Active' : 'Expired'}
                          </Badge>
                        </div>
                        <Button variant="ghost" onClick={() => window.location.href = `/contracts/${contract.id}`}>
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Section>
    </Container>
  );
}