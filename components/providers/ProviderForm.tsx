'use client';

import { useState } from 'react';
import { Card, Title, TextInput, Select, SelectItem, Button } from '@tremor/react';

interface ProviderFormProps {
  initialData?: {
    id?: string;
    firstName: string;
    lastName: string;
    type: string;
    specialty: string;
    npi?: string;
  };
  onSubmit: (data: any) => Promise<void>;
}

export default function ProviderForm({ initialData, onSubmit }: ProviderFormProps) {
  const [formData, setFormData] = useState(initialData || {
    firstName: '',
    lastName: '',
    type: '',
    specialty: '',
    npi: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <Title>{initialData ? 'Edit Provider' : 'Add New Provider'}</Title>
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TextInput
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <TextInput
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>

        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
          placeholder="Provider Type"
          required
        >
          <SelectItem value="PHYSICIAN">Physician</SelectItem>
          <SelectItem value="NP">Nurse Practitioner</SelectItem>
          <SelectItem value="PA">Physician Assistant</SelectItem>
        </Select>

        <TextInput
          placeholder="NPI Number"
          value={formData.npi}
          onChange={(e) => setFormData({ ...formData, npi: e.target.value })}
        />

        <div className="flex justify-end space-x-4">
          <Button variant="secondary" type="button">
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Provider' : 'Add Provider'}
          </Button>
        </div>
      </form>
    </Card>
  );
}