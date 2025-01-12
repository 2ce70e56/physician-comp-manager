import React, { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Select,
  SelectItem,
  Grid,
  Col,
  DateRangePicker,
  BarChart,
  LineChart
} from '@tremor/react';
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

export const ReportGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedPhysicians, setSelectedPhysicians] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customizations, setCustomizations] = useState<Record<string, boolean>>({});

  const generatePDF = async (template: ReportTemplate, data: any) => {
    const doc = new jsPDF();
    let yOffset = 20;

    // Add header
    doc.setFontSize(18);
    doc.text(template.name, 20, yOffset);
    yOffset += 15;

    // Add date range
    doc.setFontSize(12);
    const dateText = `Report Period: ${dateRange[0]?.toLocaleDateString()} - ${dateRange[1]?.toLocaleDateString()}`;
    doc.text(dateText, 20, yOffset);
    yOffset += 15;

    // Add sections
    template.sections.forEach(section => {
      if (!customizations[section.title]) return;

      doc.setFontSize(14);
      doc.text(section.title, 20, yOffset);
      yOffset += 10;

      switch (section.type) {
        case 'summary':
          // Add summary text
          doc.setFontSize(12);
          doc.text('Summary content goes here...', 20, yOffset);
          yOffset += 30;
          break;

        case 'metrics':
          // Add metrics in a table format
          doc.setFontSize(12);
          const metrics = ['Total wRVUs', 'Average Collections', 'Compensation Rate'];
          metrics.forEach(metric => {
            doc.text(`${metric}: ${Math.random() * 1000}`, 25, yOffset);
            yOffset += 8;
          });
          yOffset += 10;
          break;

        case 'chart':
          // Add placeholder for chart
          doc.rect(20, yOffset, 170, 80);
          doc.text('Chart visualization', 85, yOffset + 40);
          yOffset += 90;
          break;
      }
    });

    return doc;
  };

  const generateExcel = async (template: ReportTemplate, data: any) => {
    const wb = XLSX.utils.book_new();
    
    template.sections.forEach(section => {
      if (!customizations[section.title]) return;

      const ws_data = [
        [section.title],
        [],
        // Add section-specific data here
      ];

      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.book_append_sheet(wb, ws, section.title);
    });

    return wb;
  };

  const handleGenerateReport = async () => {
    if (!selectedTemplate || !dateRange[0] || !dateRange[1]) return;

    setIsGenerating(true);
    try {
      const template = defaultTemplates.find(t => t.id === selectedTemplate);
      if (!template) throw new Error('Template not found');

      // Fetch data based on template, date range, and selected physicians
      const data = await fetchReportData(template, dateRange, selectedPhysicians);

      // Generate reports in selected formats
      const reports = [];
      
      // Generate PDF
      const pdfDoc = await generatePDF(template, data);
      reports.push({
        format: 'pdf',
        content: pdfDoc.output('blob')
      });

      // Generate Excel
      const excelWb = await generateExcel(template, data);
      const excelBuffer = XLSX.write(excelWb, { bookType: 'xlsx', type: 'array' });
      reports.push({
        format: 'xlsx',
        content: new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      });

      // Trigger downloads
      reports.forEach(report => {
        const url = URL.createObjectURL(report.content);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${template.name}_${dateRange[0]?.toISOString().split('T')[0]}_${report.format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });

    } catch (error) {
      console.error('Error generating report:', error);
      // Handle error appropriately
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchReportData = async (
    template: ReportTemplate,
    dateRange: [Date | null, Date | null],
    physicians: string[]
  ) => {
    // Implement data fetching logic here
    return {};
  };

  return (
    <Card className="mt-6">
      <Title>Report Generator</Title>
      <Text>Create customized reports for physician productivity and compensation</Text>

      <Grid numItems={2} className="gap-4 mt-4">
        <Col>
          <Select
            value={selectedTemplate}
            onValueChange={setSelectedTemplate}
            placeholder="Select Report Template"
          >
            {defaultTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </Select>
        </Col>
        <Col>
          <DateRangePicker
            value={dateRange}
            onValueChange={setDateRange}
            className="max-w-md mx-auto"
          />
        </Col>
      </Grid>

      {selectedTemplate && (
        <div className="mt-6">
          <Title className="text-lg">Customize Sections</Title>
          <div className="space-y-2 mt-2">
            {defaultTemplates
              .find(t => t.id === selectedTemplate)
              ?.sections.map(section => (
                <label key={section.title} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={customizations[section.title] ?? true}
                    onChange={(e) => setCustomizations({
                      ...customizations,
                      [section.title]: e.target.checked
                    })}
                    className="form-checkbox"
                  />
                  <span>{section.title}</span>
                </label>
              ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Button
          onClick={handleGenerateReport}
          disabled={!selectedTemplate || !dateRange[0] || !dateRange[1] || isGenerating}
          loading={isGenerating}
        >
          {isGenerating ? 'Generating Report...' : 'Generate Report'}
        </Button>
      </div>
    </Card>
  );
};

export default ReportGenerator;