'use client';

import { useState } from 'react';
import { Card, Title, Text, Button, TextInput, Select, SelectItem } from '@tremor/react';
import { useRouter } from 'next/navigation';

export default function ProvidersPage() {
  const [providers, setProviders] = useState([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      type: 'PHYSICIAN',
      specialty: 'Cardiology',
      npi: '1234567890'
    }
    // Add more sample providers here
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProvider, setNewProvider] = useState({
    firstName: '',
    lastName: '',
    type: 'PHYSICIAN',
    specialty: '',
    npi: ''
  });

  const specialties = [
    'Cardiology',
    'Internal Medicine',
    'Family Medicine',
    'Surgery',
    'Pediatrics',
    'Orthopedics',
    'Neurology'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call here
    setProviders([...providers, { ...newProvider, id: Date.now().toString() }]);
    setShowAddForm(false);
    setNewProvider({
      firstName: '',
      lastName: '',
      type: 'PHYSICIAN',
      specialty: '',
      npi: ''
    });
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title>Providers</Title>
          <Text>Manage your organization's providers and their compensation details.</Text>
        </div>
        <Button onClick={() => setShowAddForm(true)}>Add Provider</Button>
      </div>
      
      {showAddForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                placeholder="First Name"
                value={newProvider.firstName}
                onChange={(e) => setNewProvider({ ...newProvider, firstName: e.target.value })}
                required
              />
              <TextInput
                placeholder="Last Name"
                value={newProvider.lastName}
                onChange={(e) => setNewProvider({ ...newProvider, lastName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                value={newProvider.type}
                onValueChange={(value) => setNewProvider({ ...newProvider, type: value })}
                required
              >
                <SelectItem value="PHYSICIAN">Physician</SelectItem>
                <SelectItem value="NP">Nurse Practitioner</SelectItem>
                <SelectItem value="PA">Physician Assistant</SelectItem>
              </Select>

              <Select
                value={newProvider.specialty}
                onValueChange={(value) => setNewProvider({ ...newProvider, specialty: value })}
                required
              >
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <TextInput
              placeholder="NPI Number"
              value={newProvider.npi}
              onChange={(e) => setNewProvider({ ...newProvider, npi: e.target.value })}
            />

            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Provider</Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NPI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providers.map((provider) => (
              <tr key={provider.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.firstName} {provider.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.specialty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.npi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    size="xs"
                    variant="secondary"
                    onClick={() => window.location.href = `/providers/${provider.id}`}
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