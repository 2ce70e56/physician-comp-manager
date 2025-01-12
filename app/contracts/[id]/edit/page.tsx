'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function EditContractPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [contract, setContract] = useState({
    name: 'Production Contract 2025',
    type: 'production',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    baseCompensation: 250000,
    wRVURate: 45,
    wRVUThreshold: 4800,
    status: 'active'
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save contract changes
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      router.push(`/contracts/${params.id}`);
    } catch (error) {
      console.error('Error saving contract:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Edit Contract</PageHeaderHeading>
        <PageHeaderDescription>
          Modify contract terms and conditions
        </PageHeaderDescription>
      </PageHeader>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Contract Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Contract Name
                </label>
                <Input
                  id="name"
                  value={contract.name}
                  onChange={(e) => setContract({ ...contract, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Contract Type
                </label>
                <Select
                  value={contract.type}
                  onValueChange={(value) => setContract({ ...contract, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  value={contract.startDate}
                  onChange={(e) => setContract({ ...contract, startDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium">
                  End Date
                </label>
                <Input
                  id="endDate"
                  type="date"
                  value={contract.endDate}
                  onChange={(e) => setContract({ ...contract, endDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="baseCompensation" className="text-sm font-medium">
                  Base Compensation
                </label>
                <Input
                  id="baseCompensation"
                  type="number"
                  value={contract.baseCompensation}
                  onChange={(e) => setContract({ ...contract, baseCompensation: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="wRVURate" className="text-sm font-medium">
                  wRVU Rate
                </label>
                <Input
                  id="wRVURate"
                  type="number"
                  value={contract.wRVURate}
                  onChange={(e) => setContract({ ...contract, wRVURate: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="wRVUThreshold" className="text-sm font-medium">
                  wRVU Threshold
                </label>
                <Input
                  id="wRVUThreshold"
                  type="number"
                  value={contract.wRVUThreshold}
                  onChange={(e) => setContract({ ...contract, wRVUThreshold: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={contract.status}
                  onValueChange={(value) => setContract({ ...contract, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push(`/contracts/${params.id}`)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </Container>
  );
}