'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function ContractsPage() {
  const [contracts] = useState([
    {
      id: '1',
      providerName: 'John Doe',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'Active',
      type: 'Full Time',
      terms: [
        { type: 'base', amount: 250000, frequency: 'annual' },
        { type: 'wRVU', amount: 45, frequency: 'annual', threshold: 4500 }
      ]
    }
  ]);

  return (
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>Contracts</PageHeaderHeading>
            <PageHeaderDescription>
              Manage provider contracts and compensation terms.
            </PageHeaderDescription>
          </div>
          <Button asChild>
            <Link href="/contracts/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Contract
            </Link>
          </Button>
        </PageHeader>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Active Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.providerName}</TableCell>
                    <TableCell>{contract.type}</TableCell>
                    <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Ongoing'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={contract.status === 'Active' ? 'success' : 'secondary'}>
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" asChild>
                        <Link href={`/contracts/${contract.id}`}>View</Link>
                      </Button>
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