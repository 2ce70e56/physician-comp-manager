'use client';

import { useState } from 'react';
import { Card, Title, Text, Button, TextInput, Select, SelectItem, NumberInput } from '@tremor/react';

export default function ContractsPage() {
  const [contracts, setContracts] = useState([
    {
      id: '1',
      providerName: 'John Doe',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'Active',
      terms: [
        { type: 'base', amount: 250000, frequency: 'annual' },
        { type: 'wRVU', amount: 45, frequency: 'annual', threshold: 4500 }
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContract, setNewContract] = useState({
    providerId: '',
    startDate: '',
    endDate: '',
    terms: []
  });

  const [providers] = useState([
    { id: '1', name: 'John Doe', specialty: 'Cardiology' },
    { id: '2', name: 'Jane Smith', specialty: 'Internal Medicine' }
  ]);

  const handleTermChange = (index: number, field: string, value: any) => {
    const updatedTerms = [...newContract.terms];
    updatedTerms[index] = {
      ...updatedTerms[index],
      [field]: value
    };
    setNewContract({
      ...newContract,
      terms: updatedTerms
    });
  };

  const handleAddTerm = () => {
    setNewContract({
      ...newContract,
      terms: [...newContract.terms, {
        type: 'base',
        amount: 0,
        frequency: 'annual'
      }]
    });
  };

  const handleRemoveTerm = (index: number) => {
    const updatedTerms = newContract.terms.filter((_, i) => i !== index);
    setNewContract({
      ...newContract,
      terms: updatedTerms
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call here
    const newContractData = {
      ...newContract,
      id: Date.now().toString(),
      status: 'Active',
      providerName: providers.find(p => p.id === newContract.providerId)?.name || ''
    };
    setContracts([...contracts, newContractData]);
    setShowAddForm(false);
    setNewContract({
      providerId: '',
      startDate: '',
      endDate: '',
      terms: []
    });
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title>Contracts</Title>
          <Text>Manage provider contracts and compensation terms.</Text>
        </div>
        <Button onClick={() => setShowAddForm(true)}>Add Contract</Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              value={newContract.providerId}
              onValueChange={(value) => setNewContract({ ...newContract, providerId: value })}
              placeholder="Select Provider"
              required
            >
              {providers.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name} - {provider.specialty}
                </SelectItem>
              ))}
            </Select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                type="date"
                placeholder="Start Date"
                value={newContract.startDate}
                onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
                required
              />
              <TextInput
                type="date"
                placeholder="End Date"
                value={newContract.endDate}
                onChange={(e) => setNewContract({ ...newContract, endDate: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Text>Contract Terms</Text>
                <Button size="xs" onClick={handleAddTerm}>Add Term</Button>
              </div>

              {newContract.terms.map((term, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <Select
                    value={term.type}
                    onValueChange={(value) => handleTermChange(index, 'type', value)}
                    required
                  >
                    <SelectItem value="base">Base Salary</SelectItem>
                    <SelectItem value="wRVU">wRVU Based</SelectItem>
                    <SelectItem value="quality">Quality Bonus</SelectItem>
                    <SelectItem value="bonus">Other Bonus</SelectItem>
                  </Select>

                  <NumberInput
                    placeholder="Amount"
                    value={term.amount}
                    onValueChange={(value) => handleTermChange(index, 'amount', value)}
                    required
                  />

                  <Select
                    value={term.frequency}
                    onValueChange={(value) => handleTermChange(index, 'frequency', value)}
                    required
                  >
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </Select>

                  <Button
                    size="xs"
                    variant="secondary"
                    color="red"
                    onClick={() => handleRemoveTerm(index)}
                  >
                    Remove
                  </Button>

                  {term.type === 'wRVU' && (
                    <div className="col-span-full">
                      <NumberInput
                        placeholder="wRVU Threshold"
                        value={term.threshold}
                        onValueChange={(value) => handleTermChange(index, 'threshold', value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button type="submit">Save Contract</Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {contract.providerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(contract.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Ongoing'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {contract.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    size="xs"
                    variant="secondary"
                    onClick={() => window.location.href = `/contracts/${contract.id}`}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </main>
  );
}