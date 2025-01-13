'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function NewContractPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [contract, setContract] = useState({
    name: '',
    provider: '',
    type: 'production',
    startDate: '',
    endDate: '',
    baseCompensation: 250000,
    wRVURate: 45,
    wRVUThreshold: 4800,
    qualityBonus: 5,
    collectionRate: 35,
    status: 'draft'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate dates
      const start = new Date(contract.startDate);
      const end = new Date(contract.endDate);
      
      if (end <= start) {
        throw new Error('End date must be after start date');
      }

      // Add API call to save contract
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contract),
      });

      if (!response.ok) {
        throw new Error('Failed to create contract');
      }

      router.push('/contracts');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>New Contract</PageHeaderHeading>
        <PageHeaderDescription>
          Create a new provider compensation contract
        </PageHeaderDescription>
      </PageHeader>

      <Section>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Contract Name</Label>
                  <Input
                    id="name"
                    required
                    value={contract.name}
                    onChange={(e) => setContract({ ...contract, name: e.target.value })}
                    placeholder="e.g., 2025 Production Contract"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provider">Provider</Label>
                  <Select
                    value={contract.provider}
                    onValueChange={(value) => setContract({ ...contract, provider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="provider1">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="provider2">Dr. Michael Chen</SelectItem>
                      <SelectItem value="provider3">Dr. Emily Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Contract Type</Label>
                  <Select
                    value={contract.type}
                    onValueChange={(value) => setContract({ ...contract, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production Based</SelectItem>
                      <SelectItem value="salary">Straight Salary</SelectItem>
                      <SelectItem value="hybrid">Hybrid Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    required
                    value={contract.startDate}
                    onChange={(e) => setContract({ ...contract, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    required
                    value={contract.endDate}
                    onChange={(e) => setContract({ ...contract, endDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baseCompensation">Base Compensation ($)</Label>
                  <Input
                    id="baseCompensation"
                    type="number"
                    required
                    value={contract.baseCompensation}
                    onChange={(e) => setContract({ ...contract, baseCompensation: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wRVURate">wRVU Rate ($)</Label>
                  <Input
                    id="wRVURate"
                    type="number"
                    required
                    value={contract.wRVURate}
                    onChange={(e) => setContract({ ...contract, wRVURate: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wRVUThreshold">wRVU Threshold</Label>
                  <Input
                    id="wRVUThreshold"
                    type="number"
                    required
                    value={contract.wRVUThreshold}
                    onChange={(e) => setContract({ ...contract, wRVUThreshold: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualityBonus">Quality Bonus (%)</Label>
                  <Input
                    id="qualityBonus"
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={contract.qualityBonus}
                    onChange={(e) => setContract({ ...contract, qualityBonus: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collectionRate">Collection Rate (%)</Label>
                  <Input
                    id="collectionRate"
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={contract.collectionRate}
                    onChange={(e) => setContract({ ...contract, collectionRate: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={contract.status}
                    onValueChange={(value) => setContract({ ...contract, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending Approval</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Create Contract'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Section>
    </Container>
  );
}