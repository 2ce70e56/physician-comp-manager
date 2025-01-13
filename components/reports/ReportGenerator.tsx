'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useData } from '@/lib/context/data-context';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface ReportConfig {
  type: string;
  dateRange: [Date | null, Date | null];
  specialty?: string;
  provider?: string;
  includeMetrics: {
    productivity: boolean;
    compensation: boolean;
    collections: boolean;
    quality: boolean;
  };
  format: 'pdf' | 'excel';
}

export function ReportGenerator() {
  const { providers, contracts } = useData();
  const [config, setConfig] = useState<ReportConfig>({
    type: 'provider',
    dateRange: [null, null],
    includeMetrics: {
      productivity: true,
      compensation: true,
      collections: true,
      quality: true
    },
    format: 'pdf'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ... (previous generatePDFReport and generateExcelReport functions)

  const handleGenerateReport = async () => {
    try {
      setError(null);
      setIsGenerating(true);

      // Validate configuration
      if (!config.dateRange[0] || !config.dateRange[1]) {
        throw new Error('Please select a date range');
      }

      // Gather report data based on configuration
      const reportData = {
        productivity: providers
          .filter(p => !config.specialty || p.specialty === config.specialty)
          .filter(p => !config.provider || p.id === config.provider)
          .map(p => ({
            provider: p.name,
            wRVUs: p.metrics?.ytdWRVUs || 0,
            target: p.metrics?.targetWRVUs || 0,
            variance: ((p.metrics?.ytdWRVUs || 0) - (p.metrics?.targetWRVUs || 0))
          })),
        compensation: providers
          .filter(p => !config.specialty || p.specialty === config.specialty)
          .filter(p => !config.provider || p.id === config.provider)
          .map(p => {
            const contract = contracts.find(c => c.provider === p.id);
            return {
              provider: p.name,
              base: contract?.baseCompensation || 0,
              bonus: (p.metrics?.ytdCompensation || 0) - (contract?.baseCompensation || 0),
              total: p.metrics?.ytdCompensation || 0
            };
          }),
        collections: providers
          .filter(p => !config.specialty || p.specialty === config.specialty)
          .filter(p => !config.provider || p.id === config.provider)
          .map(p => ({
            provider: p.name,
            collections: p.metrics?.ytdCollections || 0,
            target: p.metrics?.targetCollections || 0,
            variance: ((p.metrics?.ytdCollections || 0) - (p.metrics?.targetCollections || 0))
          })),
        quality: providers
          .filter(p => !config.specialty || p.specialty === config.specialty)
          .filter(p => !config.provider || p.id === config.provider)
          .map(p => ({
            provider: p.name,
            score: p.metrics?.qualityScore || 0
          }))
      };

      // Generate report in selected format
      if (config.format === 'pdf') {
        const doc = await generatePDFReport(reportData);
        doc.save(`performance-report-${new Date().toISOString().split('T')[0]}.pdf`);
      } else {
        const wb = generateExcelReport(reportData);
        XLSX.writeFile(wb, `performance-report-${new Date().toISOString().split('T')[0]}.xlsx`);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select
                value={config.type}
                onValueChange={(value) => setConfig({ ...config, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="provider">Provider Report</SelectItem>
                  <SelectItem value="specialty">Specialty Report</SelectItem>
                  <SelectItem value="contract">Contract Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <DateRangePicker
                value={config.dateRange}
                onChange={(range) => setConfig({ ...config, dateRange: range })}
              />
            </div>

            {config.type === 'specialty' && (
              <div className="space-y-2">
                <Label>Specialty</Label>
                <Select
                  value={config.specialty}
                  onValueChange={(value) => setConfig({ ...config, specialty: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(new Set(providers.map(p => p.specialty))).map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {config.type === 'provider' && (
              <div className="space-y-2">
                <Label>Provider</Label>
                <Select
                  value={config.provider}
                  onValueChange={(value) => setConfig({ ...config, provider: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Providers" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map(provider => (
                      <SelectItem key={provider.id} value={provider.id}>{provider.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Label>Include Metrics</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={config.includeMetrics.productivity}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    includeMetrics: { ...config.includeMetrics, productivity: checked as boolean }
                  })}
                />
                <Label>Productivity</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={config.includeMetrics.compensation}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    includeMetrics: { ...config.includeMetrics, compensation: checked as boolean }
                  })}
                />
                <Label>Compensation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={config.includeMetrics.collections}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    includeMetrics: { ...config.includeMetrics, collections: checked as boolean }
                  })}
                />
                <Label>Collections</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={config.includeMetrics.quality}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    includeMetrics: { ...config.includeMetrics, quality: checked as boolean }
                  })}
                />
                <Label>Quality</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Report Format</Label>
            <Select
              value={config.format}
              onValueChange={(value: 'pdf' | 'excel') => setConfig({ ...config, format: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating Report...' : 'Generate Report'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}