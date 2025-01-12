import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout'

export default function Home() {
  return (
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>Welcome to CompManager</PageHeaderHeading>
            <PageHeaderDescription>
              Modern physician compensation and productivity management
            </PageHeaderDescription>
          </div>
        </PageHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Providers</CardTitle>
              <CardDescription>
                Manage physicians and advanced practice providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/providers">View Providers</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contracts</CardTitle>
              <CardDescription>
                Handle compensation agreements and terms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/contracts">View Contracts</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Track productivity and compensation metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/analytics">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </Container>
  )
}