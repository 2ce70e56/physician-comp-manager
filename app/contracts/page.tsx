import { Card, Title, Text } from '@tremor/react';
import ContractList from '@/components/contracts/ContractList';
import { prisma } from '@/lib/prisma';

export default async function ContractsPage() {
  const contracts = await prisma.contract.findMany({
    include: {
      provider: true
    }
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Contracts</Title>
      <Text>Manage provider contracts and compensation terms.</Text>
      <Card className="mt-6">
        <ContractList contracts={contracts} />
      </Card>
    </main>
  );
}