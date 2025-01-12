'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';

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
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>Contract Details</PageHeaderHeading>
            <PageHeaderDescription>
              Contract for {contract.provider.name}
            </PageHeaderDescription>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => window.location.href = `/providers/${contract.provider.id}`}
            >
              View Provider
            </Button>
            <Button
              onClick={() => window.location.href = `/contracts/${contract.id}/edit`}
            >
              Edit Contract
            </Button>
          </div>
        </PageHeader>

        <div className="grid gap-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Contract Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="mb-2">{contract.status}</Badge>
                <p className="text-sm text-muted-foreground">
                  {new Date(contract.startDate).toLocaleDateString()} - 
                  {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Ongoing'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Annual Base Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${calculateAnnualValue().toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Base + Quality Incentives</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>wRVU Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${contract.terms.find(t => t.type === 'wRVU')?.amount || 0}/wRVU
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Above {contract.terms.find(t => t.type === 'wRVU')?.threshold.toLocaleString()} wRVUs
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="terms" className="mt-6">
            <TabsList>
              <TabsTrigger value="terms">Compensation Terms</TabsTrigger>
              <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
              <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="terms">
              <Card>
                <CardHeader>
                  <CardTitle>Compensation Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {contract.terms.map((term, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start">
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

            <TabsContent value="quality">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Patient Satisfaction</h4>
                          <p className="text-sm text-muted-foreground">Target: ≥ 90%</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">92%</div>
                          <Badge variant="success">On Track</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Quality Measures</h4>
                          <p className="text-sm text-muted-foreground">Target: ≥ 85%</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">83%</div>
                          <Badge variant="secondary">At Risk</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Base Salary</h4>
                          <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${(250000 / 12).toLocaleString()}</div>
                          <p className="text-sm text-muted-foreground">Next: Feb 1, 2025</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">wRVU Bonus</h4>
                          <p className="text-sm text-muted-foreground">Quarterly Payment</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">Variable</div>
                          <p className="text-sm text-muted-foreground">Next: Apr 1, 2025</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">Quality Bonus</h4>
                          <p className="text-sm text-muted-foreground">Annual Payment</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">Up to $25,000</div>
                          <p className="text-sm text-muted-foreground">Next: Jan 1, 2026</p>
                        </div>
                      </div>
                    </div>
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