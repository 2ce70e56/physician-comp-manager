'use client';

import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react';
import Link from 'next/link';

interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  type: string;
  specialty: string;
  contracts: any[];
  productivity: any[];
}

export default function ProvidersList({ providers }: { providers: Provider[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Specialty</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {providers.map((provider) => (
          <TableRow key={provider.id}>
            <TableCell>
              <Link href={`/providers/${provider.id}`} className="text-blue-600 hover:underline">
                {provider.firstName} {provider.lastName}
              </Link>
            </TableCell>
            <TableCell>{provider.type}</TableCell>
            <TableCell>{provider.specialty}</TableCell>
            <TableCell>
              {provider.contracts.some(c => !c.endDate) ? 'Active' : 'Inactive'}
            </TableCell>
            <TableCell>
              <Link href={`/providers/${provider.id}/edit`} className="text-blue-600 hover:underline">
                Edit
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}