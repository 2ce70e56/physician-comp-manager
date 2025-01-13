import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const provider = await request.json();

    // Validate provider data
    if (!provider.name || !provider.specialty || !provider.email || !provider.startDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Add database integration
    // For now, we'll simulate a successful save
    const savedProvider = {
      id: Math.random().toString(36).substr(2, 9),
      ...provider,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(savedProvider, { status: 201 });
  } catch (error) {
    console.error('Error creating provider:', error);
    return NextResponse.json(
      { error: 'Failed to create provider' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // TODO: Add database integration
    // For now, return sample data
    const providers = [
      {
        id: 'provider1',
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        email: 'sarah.johnson@example.com',
        phone: '(555) 123-4567',
        startDate: '2020-01-15',
        status: 'active',
        location: 'Main Campus',
        npi: '1234567890',
        metrics: {
          ytdWRVUs: 2525,
          targetWRVUs: 2400,
          ytdCollections: 750000,
          qualityScore: 92
        }
      },
      {
        id: 'provider2',
        name: 'Dr. Michael Chen',
        specialty: 'Internal Medicine',
        email: 'michael.chen@example.com',
        phone: '(555) 234-5678',
        startDate: '2021-03-01',
        status: 'active',
        location: 'West Branch',
        npi: '2345678901',
        metrics: {
          ytdWRVUs: 2350,
          targetWRVUs: 2400,
          ytdCollections: 685000,
          qualityScore: 88
        }
      },
      {
        id: 'provider3',
        name: 'Dr. Emily Rodriguez',
        specialty: 'Pediatrics',
        email: 'emily.rodriguez@example.com',
        phone: '(555) 345-6789',
        startDate: '2019-06-15',
        status: 'active',
        location: 'East Branch',
        npi: '3456789012',
        metrics: {
          ytdWRVUs: 2650,
          targetWRVUs: 2400,
          ytdCollections: 820000,
          qualityScore: 95
        }
      }
    ];

    return NextResponse.json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const provider = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      );
    }

    // TODO: Add database integration
    // For now, simulate updating a provider
    const updatedProvider = {
      ...provider,
      id,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(updatedProvider);
  } catch (error) {
    console.error('Error updating provider:', error);
    return NextResponse.json(
      { error: 'Failed to update provider' },
      { status: 500 }
    );
  }
}