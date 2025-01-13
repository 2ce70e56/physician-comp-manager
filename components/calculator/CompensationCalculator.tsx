'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CalculatorInputs {
  baseCompensation: number;
  wRVURate: number;
  wRVUThreshold: number;
  actualWRVUs: number;
  collectionRate: number;
  actualCollections: number;
  quality: number;
}

interface CalculatorResults {
  basePayment: number;
  productivityBonus: number;
  collectionsBonus: number;
  qualityBonus: number;
  totalCompensation: number;
}

export function CompensationCalculator() {
  const [contractType, setContractType] = useState('production');
  const [inputs, setInputs] = useState<CalculatorInputs>({
    baseCompensation: 250000,
    wRVURate: 45,
    wRVUThreshold: 4800,
    actualWRVUs: 5200,
    collectionRate: 0.35,
    actualCollections: 750000,
    quality: 90
  });

  const [results, setResults] = useState<CalculatorResults>({
    basePayment: 0,
    productivityBonus: 0,
    collectionsBonus: 0,
    qualityBonus: 0,
    totalCompensation: 0
  });

  const calculateCompensation = () => {
    const {
      baseCompensation,
      wRVURate,
      wRVUThreshold,
      actualWRVUs,
      collectionRate,
      actualCollections,
      quality
    } = inputs;

    let results: CalculatorResults = {
      basePayment: baseCompensation,
      productivityBonus: 0,
      collectionsBonus: 0,
      qualityBonus: 0,
      totalCompensation: 0
    };

    // Calculate productivity bonus
    if (actualWRVUs > wRVUThreshold) {
      results.productivityBonus = (actualWRVUs - wRVUThreshold) * wRVURate;
    }

    // Calculate collections bonus
    const expectedCollections = actualWRVUs * 150; // Assuming $150 per wRVU
    if (actualCollections > expectedCollections) {
      results.collectionsBonus = (actualCollections - expectedCollections) * collectionRate;
    }

    // Calculate quality bonus
    if (quality >= 90) {
      results.qualityBonus = baseCompensation * 0.05; // 5% quality bonus
    }

    // Calculate total compensation
    results.totalCompensation = 
      results.basePayment + 
      results.productivityBonus + 
      results.collectionsBonus + 
      results.qualityBonus;

    setResults(results);
  };

  useEffect(() => {
    calculateCompensation();
  }, [inputs]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compensation Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Contract Type</Label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production Based</SelectItem>
                  <SelectItem value="salary">Straight Salary</SelectItem>
                  <SelectItem value="hybrid">Hybrid Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Base Compensation</Label>
              <Input
                type="number"
                value={inputs.baseCompensation}
                onChange={(e) => setInputs({ ...inputs, baseCompensation: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>wRVU Rate</Label>
              <Input
                type="number"
                value={inputs.wRVURate}
                onChange={(e) => setInputs({ ...inputs, wRVURate: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>wRVU Threshold</Label>
              <Input
                type="number"
                value={inputs.wRVUThreshold}
                onChange={(e) => setInputs({ ...inputs, wRVUThreshold: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Actual wRVUs</Label>
              <Input
                type="number"
                value={inputs.actualWRVUs}
                onChange={(e) => setInputs({ ...inputs, actualWRVUs: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Collection Rate</Label>
              <Input
                type="number"
                value={inputs.collectionRate}
                step="0.01"
                onChange={(e) => setInputs({ ...inputs, collectionRate: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Actual Collections</Label>
              <Input
                type="number"
                value={inputs.actualCollections}
                onChange={(e) => setInputs({ ...inputs, actualCollections: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Quality Score (%)</Label>
              <Input
                type="number"
                value={inputs.quality}
                min="0"
                max="100"
                onChange={(e) => setInputs({ ...inputs, quality: Number(e.target.value) })}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Base Payment</TableCell>
                <TableCell className="text-right">{formatCurrency(results.basePayment)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Productivity Bonus</TableCell>
                <TableCell className="text-right">{formatCurrency(results.productivityBonus)}</TableCell>
              </TableRow>
              <TableRow>
  <TableCell>Collections Bonus</TableCell>
  <TableCell className="text-right">{formatCurrency(results.collectionsBonus)}</TableCell>
</TableRow>
<TableRow>
  <TableCell>Quality Bonus</TableCell>
  <TableCell className="text-right">{formatCurrency(results.qualityBonus)}</TableCell>
</TableRow>
<TableRow className="font-bold">
  <TableCell>Total Compensation</TableCell>
  <TableCell className="text-right">{formatCurrency(results.totalCompensation)}</TableCell>
</TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                // Reset to defaults
                setInputs({
                  baseCompensation: 250000,
                  wRVURate: 45,
                  wRVUThreshold: 4800,
                  actualWRVUs: 5200,
                  collectionRate: 0.35,
                  actualCollections: 750000,
                  quality: 90
                });
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                // Export calculation as CSV
                const csvContent = `
Compensation Calculation Summary
Date: ${new Date().toLocaleDateString()}

Contract Type: ${contractType}

Inputs:
Base Compensation: ${formatCurrency(inputs.baseCompensation)}
wRVU Rate: ${inputs.wRVURate}
wRVU Threshold: ${inputs.wRVUThreshold}
Actual wRVUs: ${inputs.actualWRVUs}
Collection Rate: ${inputs.collectionRate * 100}%
Actual Collections: ${formatCurrency(inputs.actualCollections)}
Quality Score: ${inputs.quality}%

Results:
Base Payment: ${formatCurrency(results.basePayment)}
Productivity Bonus: ${formatCurrency(results.productivityBonus)}
Collections Bonus: ${formatCurrency(results.collectionsBonus)}
Quality Bonus: ${formatCurrency(results.qualityBonus)}
Total Compensation: ${formatCurrency(results.totalCompensation)}
                `.trim();

                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `compensation-calculation-${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              }}
            >
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}