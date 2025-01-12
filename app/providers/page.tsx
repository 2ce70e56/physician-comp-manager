import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from "@/components/ui/layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ProvidersPage() {
  // Sample data - replace with real data
  const providers = [
    {
      id: "1",
      name: "Dr. John Smith",
      type: "PHYSICIAN",
      specialty: "Cardiology",
      status: "Active",
    },
    // Add more sample providers
  ]

  return (
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>Providers</PageHeaderHeading>
            <PageHeaderDescription>
              Manage physicians and advanced practice providers.
            </PageHeaderDescription>
          </div>
          <Button asChild>
            <Link href="/providers/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Provider
            </Link>
          </Button>
        </PageHeader>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell>{provider.type}</TableCell>
                  <TableCell>{provider.specialty}</TableCell>
                  <TableCell>
                    <Badge
                      variant={provider.status === "Active" ? "success" : "secondary"}
                    >
                      {provider.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" asChild>
                      <Link href={`/providers/${provider.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>
    </Container>
  )
}