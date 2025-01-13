'use client';

import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { CompensationCalculator } from '@/components/CompensationCalculator';

export default function CalculatorPage() {
  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Compensation Calculator</PageHeaderHeading>
        <PageHeaderDescription>
          Calculate physician compensation based on productivity and performance metrics
        </PageHeaderDescription>
      </PageHeader>

      <Section>
        <CompensationCalculator />
      </Section>
    </Container>
  );
}