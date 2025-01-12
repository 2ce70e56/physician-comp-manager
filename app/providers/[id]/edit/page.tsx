'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function EditProviderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState({
    firstName: 'John',
    lastName: 'Doe',
    type: 'PHYSICIAN',
    specialty: 'Cardiology',
    npi: '1234567890',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    status: 'ACTIVE'
  });

  const specialties = [
    'Cardiology',
    'Dermatology',
    'Emergency Medicine',
    'Family Medicine',
    'Gastroenterology',
    'Internal Medicine',
    'Neurology',
    'Obstetrics and Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedic Surgery',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Surgery',
    'Urology'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add API call here
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/providers/${params.id}`);
    }, 1000);
  };

  return (
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>Edit Provider</PageHeaderHeading>
            <PageHeaderDescription>
              Update provider information and settings
            </PageHeaderDescription>
          </div>
        </PageHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <Input
                    id="firstName"
                    value={provider.firstName}
                    onChange={e => setProvider({ ...provider, firstName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <Input
                    id="lastName"
                    value={provider.lastName}
                    onChange={e => setProvider({ ...provider, lastName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">Provider Type</label>
                  <Select
                    value={provider.type}
                    onValueChange={(value) => setProvider({ ...provider, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PHYSICIAN">Physician</SelectItem>
                      <SelectItem value="NP">Nurse Practitioner</SelectItem>
                      <SelectItem value="PA">Physician Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="specialty" className="text-sm font-medium">Specialty</label>
                  <Select
                    value={provider.specialty}
                    onValueChange={(value) => setProvider({ ...provider, specialty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={provider.email}
                    onChange={e => setProvider({ ...provider, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input
                    id="phone"
                    type="tel"
                    value={provider.phone}
                    onChange={e => setProvider({ ...provider, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="npi" className="text-sm font-medium">NPI Number</label>
                  <Input
                    id="npi"
                    value={provider.npi}
                    onChange={e => setProvider({ ...provider, npi: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">Status</label>
                  <Select
                    value={provider.status}
                    onValueChange={(value) => setProvider({ ...provider, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Section>
    </Container>
  );
}