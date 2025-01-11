import { Card, Title, Text } from '@tremor/react';

export default function ContractsPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Contracts</Title>
      <Text>View and manage provider contracts.</Text>
      
      <Card className="mt-6">
        {/* Contract list will go here */}
        <div className="p-4">Contract list coming soon...</div>
      </Card>
    </main>
  );
}