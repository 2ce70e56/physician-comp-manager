import { Card, Title, Text } from '@tremor/react';

export default function ProvidersPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Providers</Title>
      <Text>Manage your organization's providers and their compensation details.</Text>
      
      <Card className="mt-6">
        {/* Provider list will go here */}
        <div className="p-4">Provider list coming soon...</div>
      </Card>
    </main>
  );
}