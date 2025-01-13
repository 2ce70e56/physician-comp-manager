'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function NewProviderPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    startDate: '',
    location: '',
    npi: '',
    status: 'active'
  });

  const specialties = [
    'Family Medicine',
    'Internal Medicine',
    'Pediatrics',
    'Cardiology',
    'Orthopedics',
    'Surgery',
    'Neurology',
    'Psychiatry',
    'Obstetrics/Gynecology',
    'Emergency Medicine'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add API call to save provider
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      router.push('/providers');
    } catch (error) {
      console.error('Error saving provider:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Add New Provider</PageHeaderHeading>
        <PageHeaderDescription>
          Enter provider details to create a new record
        </PageHeaderDescription>
      </PageHeader>

      <Section>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Provider Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Provider Name</Label>
                  <Input
                    id="name"
                    required
                    value={provider.name}
                    onChange={(e) => setProvider({ ...provider, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select
                    value={provider.specialty}
                    onValueChange={(value) => setProvider({ ...provider, specialty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={provider.email}
                    onChange={(e) => setProvider({ ...provider, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={provider.phone}
                    onChange={(e) => setProvider({ ...provider, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    required
                    value={provider.startDate}
                    onChange={(e) => setProvider({ ...provider, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={provider.location}
                    onChange={(e) => setProvider({ ...provider, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="npi">NPI Number</Label>
                  <Input
                    id="npi"
                    value={provider.npi}
                    onChange={(e) => setProvider({ ...provider, npi: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={provider.status}
                    onValueChange={(value) => setProvider({ ...provider, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Provider'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Section>
    </Container>
  );
}