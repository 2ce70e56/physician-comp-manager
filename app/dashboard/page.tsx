'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const stats = {
    totalProviders: 142,
    activeContracts: 138,
    averageCompensation: 285000,
    totalWRVUs: 685000,
    recentActivity: [
      { type: 'Contract Updated', provider: 'Dr. Sarah Chen', date: '2 hours ago' },
      { type: 'Productivity Imported', provider: 'All Providers', date: '4 hours ago' },
      { type: 'New Provider Added', provider: 'Dr. James Wilson', date: '1 day ago' },
    ],
    topPerformers: [
      { name: 'Dr. Michael Brown', specialty: 'Cardiology', wRVUs: 8500 },
      { name: 'Dr. Emily Davis', specialty: 'Surgery', wRVUs: 8200 },
      { name: 'Dr. David Kim', specialty: 'Orthopedics', wRVUs: 7800 },
    ]
  };

  return (
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>Dashboard</PageHeaderHeading>
            <PageHeaderDescription>
              Overview of your organization's performance metrics
            </PageHeaderDescription>
          </div>
        </PageHeader>

        <div className="grid gap-6 mt-6">
          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalProviders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.activeContracts}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Compensation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${stats.averageCompensation.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total wRVUs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalWRVUs.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers and Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest wRVU producers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{performer.name}</div>
                        <div className="text-sm text-muted-foreground">{performer.specialty}</div>
                      </div>
                      <div className="font-medium">{performer.wRVUs.toLocaleString()} wRVUs</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start justify-between">
                      <div>
                        <Badge className="mb-1">{activity.type}</Badge>
                        <div className="text-sm text-muted-foreground">{activity.provider}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Productivity Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Productivity Trends</CardTitle>
              <CardDescription>wRVU production over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full flex items-center justify-center text-muted-foreground">
                Productivity chart will be displayed here
              </div>
            </CardContent>
          </Card>

          {/* Compensation Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Compensation Distribution</CardTitle>
              <CardDescription>By specialty and provider type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full flex items-center justify-center text-muted-foreground">
                Compensation distribution chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </Container>
  );
}