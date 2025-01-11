import { redirect } from 'next/navigation';
import { Card, Title, Text } from '@tremor/react';

export default async function Home() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Physician Compensation Management</Title>
      <Text>Welcome to your compensation management dashboard.</Text>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <Title>Providers</Title>
          <Text>Manage your providers and their compensation details.</Text>
        </Card>

        <Card>
          <Title>Contracts</Title>
          <Text>View and manage provider contracts.</Text>
        </Card>

        <Card>
          <Title>Analytics</Title>
          <Text>View compensation and productivity analytics.</Text>
        </Card>
      </div>
    </main>
  );
}