import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

interface ReportTemplate {
  id: string;
  name: string;
  sections: ReportSection[];
}

interface ReportSection {
  type: 'chart' | 'table' | 'summary' | 'metrics';
  title: string;
  data: any;
  config?: any;
}

const defaultTemplates: ReportTemplate[] = [
  {
    id: 'productivity',
    name: 'Productivity Report',
    sections: [
      {
        type: 'summary',
        title: 'Executive Summary',
        data: {}
      },
      {
        type: 'chart',
        title: 'Monthly wRVU Trends',
        data: {},
        config: {
          type: 'line',
          metrics: ['wRVUs']
        }
      },
      {
        type: 'metrics',
        title: 'Key Performance Indicators',
        data: {}
      }
    ]
  },
  {
    id: 'compensation',
    name: 'Compensation Analysis',
    sections: [
      {
        type: 'summary',
        title: 'Compensation Overview',
        data: {}
      },
      {
        type: 'chart',
        title: 'Compensation vs Benchmarks',
        data: {},
        config: {
          type: 'bar',
          metrics: ['totalComp', 'benchmark']
        }
      },
      {
        type: 'metrics',
        title: 'Compensation Metrics',
        data: {}
      }
    ]
  }
];

export const ReportGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [selectedPhysicians, setSelectedPhysicians] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customizations, setCustomizations] = useState<Record<string, boolean>>({});
  const [showCalendar, setShowCalendar] = useState(false);

  const generatePDF = async (template: ReportTemplate, data: any) => {
    // ... (previous PDF generation code remains the same)
  };

  const generateExcel = async (template: ReportTemplate, data: any) => {
    // ... (previous Excel generation code remains the same)
  };

  const handleGenerateReport = async () => {
    // ... (previous report generation code remains the same)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Generator</CardTitle>
        <CardDescription>Create customized reports for physician productivity and compensation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Report Template</Label>
              <Select 
                value={selectedTemplate} 
                onValueChange={setSelectedTemplate}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Report Template" />
                </SelectTrigger>
                <SelectContent>
                  {defaultTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {dateRange.length === 2
                      ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
                      : "Select Date Range"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Date Range</DialogTitle>
                  </DialogHeader>
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange([range.from, range.to]);
                        setShowCalendar(false);
                      }
                    }}
                    numberOfMonths={2}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {selectedTemplate && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customize Sections</h3>
              <div className="space-y-2">
                {defaultTemplates
                  .find(t => t.id === selectedTemplate)
                  ?.sections.map(section => (
                    <div key={section.title} className="flex items-center space-x-2">
                      <Checkbox
                        id={section.title}
                        checked={customizations[section.title] ?? true}
                        onCheckedChange={(checked) => {
                          setCustomizations({
                            ...customizations,
                            [section.title]: checked === true
                          });
                        }}
                      />
                      <Label htmlFor={section.title}>{section.title}</Label>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleGenerateReport}
            disabled={!selectedTemplate || dateRange.length !== 2 || isGenerating}
            className="w-full"
          >
            {isGenerating ? 'Generating Report...' : 'Generate Report'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;