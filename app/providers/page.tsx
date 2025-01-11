import { Card, Title, Text } from '@tremor/react';
import ProvidersList from '@/components/providers/ProvidersList';
import { prisma } from '@/lib/prisma';

export default async function ProvidersPage() {
  const providers = await prisma.provider.findMany({
    include: {
      contracts: true,
      productivity: {
        orderBy: { period: 'desc' },
        take: 1
      }
    }
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Providers</Title>
      <Text>Manage your organization's providers and their compensation details.</Text>
      <Card className="mt-6">
        <ProvidersList providers={providers} />
      </Card>
    </main>
  );
}