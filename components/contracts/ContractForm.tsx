'use client';

import { useState } from 'react';
import { Card, Title, TextInput, NumberInput, Select, SelectItem, Button } from '@tremor/react';

interface ContractTerm {
  type: 'base' | 'bonus' | 'wRVU' | 'quality';
  amount: number;
  frequency: 'annual' | 'monthly' | 'quarterly';
  conditions?: {
    metric?: string;
    threshold?: number;
    calculation?: string;
  };
}

export default function ContractForm() {
  const [terms, setTerms] = useState<ContractTerm[]>([]);
  
  const addTerm = () => {
    setTerms([...terms, {
      type: 'base',
      amount: 0,
      frequency: 'annual'
    }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mt-6">
        <Title>Contract Terms</Title>
        
        {terms.map((term, index) => (
          <div key={index} className="space-y-4 mt-4">
            <Select
              value={term.type}
              onValueChange={(value) => {
                const newTerms = [...terms];
                newTerms[index] = { ...term, type: value as ContractTerm['type'] };
                setTerms(newTerms);
              }}
            >
              <SelectItem value="base">Base Salary</SelectItem>
              <SelectItem value="bonus">Bonus</SelectItem>
              <SelectItem value="wRVU">wRVU Based</SelectItem>
              <SelectItem value="quality">Quality Metrics</SelectItem>
            </Select>
            
            <NumberInput
              placeholder="Amount"
              value={term.amount}
              onChange={(value) => {
                const newTerms = [...terms];
                newTerms[index] = { ...term, amount: value };
                setTerms(newTerms);
              }}
            />

            <Select
              value={term.frequency}
              onValueChange={(value) => {
                const newTerms = [...terms];
                newTerms[index] = { ...term, frequency: value as ContractTerm['frequency'] };
                setTerms(newTerms);
              }}
            >
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </Select>
          </div>
        ))}
        
        <Button onClick={addTerm} className="mt-4">Add Term</Button>
        <Button type="submit" className="mt-4 ml-4">Save Contract</Button>
      </Card>
    </form>
  );
}