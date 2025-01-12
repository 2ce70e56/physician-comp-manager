import React, { useState } from 'react';
import { Card, Title, Text, Button, Select, SelectItem } from '@tremor/react';
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

    try {
      const data = fileType === 'csv' 
        ? await processCSV(file)
        : await processExcel(file);
      
      setProcessedData(data);
    } catch (error) {
      setErrors(Array.isArray(error) ? error : [String(error)]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="mt-6">
      <Title>Import Productivity Data</Title>
      <Text>Upload physician productivity data from CSV or Excel files</Text>

      <div className="mt-4">
        <Select
          value={fileType}
          onValueChange={(value) => setFileType(value as 'csv' | 'excel')}
          className="max-w-xs"
        >
          <SelectItem value="csv">CSV File</SelectItem>
          <SelectItem value="excel">Excel File</SelectItem>
        </Select>
      </div>

      <div className="mt-4">
        <input
          type="file"
          accept={fileType === 'csv' ? '.csv' : '.xlsx,.xls'}
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {isProcessing && (
        <div className="mt-4">
          <Text>Processing file...</Text>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 rounded-md">
          <Text className="text-red-700">Errors:</Text>
          <ul className="list-disc pl-5 mt-2">
            {errors.map((error, index) => (
              <li key={index} className="text-red-600">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {processedData.length > 0 && (
        <div className="mt-4">
          <Text>Successfully processed {processedData.length} records</Text>
          <Button
            className="mt-2"
            onClick={() => {
              // TODO: Implement save to database
              console.log('Saving data:', processedData);
            }}
          >
            Save to Database
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProductivityImport;