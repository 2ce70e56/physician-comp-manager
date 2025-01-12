'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container, PageHeader, PageHeaderHeading, PageHeaderDescription, Section } from '@/components/ui/layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('');
  const [date, setDate] = useState<Date>();

  const reportTypes = [
    { id: 'compensation', name: 'Compensation Summary' },
    { id: 'productivity', name: 'Productivity Analysis' },
    { id: 'market_comparison', name: 'Market Comparison' },
    { id: 'quality_metrics', name: 'Quality Metrics' },
    { id: 'contract_summary', name: 'Contract Summary' }
  ];

  const handleGenerateReport = () => {
    // Logic to generate the report based on selectedReport and date
    console.log('Generating report:', selectedReport, date);
  };

  return (
    <Container>
      <Section>
        <PageHeader>
          <div>
            <PageHeaderHeading>Reports</PageHeaderHeading>
            <PageHeaderDescription>
              Generate comprehensive reports and analyses.
            </PageHeaderDescription>
          </div>
        </PageHeader>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Report Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Select
                value={selectedReport}
                onValueChange={setSelectedReport}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                    {date ? format(date, 'PPP') : <span className="text-muted-foreground">Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  />
                </PopoverContent>
              </Popover>

              <Button onClick={handleGenerateReport}>
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Generated Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Compensation Summary</TableCell>
                  <TableCell>{format(new Date(), 'PP')}</TableCell>
                  <TableCell>
                    <Badge>Completed</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Download</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Section>
    </Container>
  );
}