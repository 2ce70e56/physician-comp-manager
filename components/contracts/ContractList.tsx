'use client';

import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react';
import Link from 'next/link';

interface Contract {
  id: string;
  provider: {
    firstName: string;
    lastName: string;
  };
  startDate: string;
  endDate?: string;
  terms: any[];
}

export default function ContractList({ contracts }: { contracts: Contract[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Provider</TableHeaderCell>
          <TableHeaderCell>Start Date</TableHeaderCell>
          <TableHeaderCell>End Date</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contracts.map((contract) => (
          <TableRow key={contract.id}>
            <TableCell>
              {contract.provider.firstName} {contract.provider.lastName}
            </TableCell>
            <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
            <TableCell>
              {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Active'}
            </TableCell>
            <TableCell>
              {contract.endDate ? 'Expired' : 'Active'}
            </TableCell>
            <TableCell>
              <Link href={`/contracts/${contract.id}`} className="text-blue-600 hover:underline">
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}