import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface ProductivityData {
  physician: string;
  specialty: string;
  wRVUs: number;
  collections: number;
  visits: number;
  date: string;
}

export const ProductivityImport: React.FC = () => {
  const [fileType, setFileType] = useState<'csv' | 'excel'>('csv');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<ProductivityData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const validateData = (data: any[]): { isValid: boolean; errors: string[] } => {
    const requiredFields = ['physician', 'specialty', 'wRVUs', 'collections', 'visits', 'date'];
    const errors: string[] = [];

    // Check for required fields
    const fields = Object.keys(data[0] || {});
    const missingFields = requiredFields.filter(field => !fields.includes(field));
    
    if (missingFields.length > 0) {
      errors.push(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate data types and values
    data.forEach((row, index) => {
      if (row.wRVUs && isNaN(Number(row.wRVUs))) {
        errors.push(`Invalid wRVUs value at row ${index + 1}`);
      }
      if (row.collections && isNaN(Number(row.collections))) {
        errors.push(`Invalid collections value at row ${index + 1}`);
      }
      if (row.visits && isNaN(Number(row.visits))) {
        errors.push(`Invalid visits value at row ${index + 1}`);
      }
      if (row.date && isNaN(Date.parse(row.date))) {
        errors.push(`Invalid date format at row ${index + 1}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const processCSV = async (file: File) => {
    return new Promise<ProductivityData[]>((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        step: (results, parser) => {
          // Update progress based on bytes processed
          const progress = (parser.streamer.pos / file.size) * 100;
          setProgress(Math.round(progress));
        },
        complete: (results) => {
          const validation = validateData(results.data);
          if (validation.isValid) {
            resolve(results.data as ProductivityData[]);
          } else {
            reject(validation.errors);
          }
        },
        error: (error) => {
          reject([`CSV parsing error: ${error.message}`]);
        }
      });
    });
  };

  const processExcel = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      const validation = validateData(jsonData);
      if (validation.isValid) {
        return jsonData as ProductivityData[];
      } else {
        throw validation.errors;
      }
    } catch (error) {
      if (Array.isArray(error)) {
        throw error;
      }
      throw [`Excel parsing error: ${error.message || 'Unknown error'}`];
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setErrors([]);
    setProgress(0);

    try {
      const data = fileType === 'csv' 
        ? await processCSV(file)
        : await processExcel(file);
      
      setProcessedData(data);
      setProgress(100);
    } catch (error) {
      setErrors(Array.isArray(error) ? error : [String(error)]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Import Productivity Data</CardTitle>
        <CardDescription>Upload physician productivity data from CSV or Excel files</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="w-[240px]">
            <Select value={fileType} onValueChange={(value: 'csv' | 'excel') => setFileType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV File</SelectItem>
                <SelectItem value="excel">Excel File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <input
              type="file"
              accept={fileType === 'csv' ? '.csv' : '.xlsx,.xls'}
              onChange={handleFileUpload}
              className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500">Processing file... {progress}%</p>
            </div>
          )}

          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>
                <ul className="list-disc pl-4 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {processedData.length > 0 && !isProcessing && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Successfully processed {processedData.length} records
              </p>
              <Button
                onClick={() => {
                  // TODO: Implement save to database
                  console.log('Saving data:', processedData);
                }}
              >
                Save to Database
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductivityImport;