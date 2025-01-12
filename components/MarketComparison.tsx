import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface MarketComparisonProps {
  specialtyData?: {
    specialty: string;
    medianComp: number;
    p25Comp: number;
    p75Comp: number;
    region: string;
  }[];
}

export const MarketComparison: React.FC<MarketComparisonProps> = ({ specialtyData = [] }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const specialties = Array.from(new Set(specialtyData.map(d => d.specialty)));
  const regions = Array.from(new Set(specialtyData.map(d => d.region)));

  const filteredData = specialtyData.filter(d => 
    (!selectedSpecialty || d.specialty === selectedSpecialty) &&
    (!selectedRegion || d.region === selectedRegion)
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Market Compensation Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select onValueChange={setSelectedSpecialty} value={selectedSpecialty}>
            <SelectTrigger>
              <SelectValue placeholder="Select Specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedRegion} value={selectedRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="specialty" />
              <YAxis 
                tickFormatter={formatCurrency}
                domain={['auto', 'auto']}
              />
              <Tooltip formatter={formatCurrency} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="medianComp" 
                stroke="#2563eb" 
                name="Median Compensation" 
              />
              <Line 
                type="monotone" 
                dataKey="p25Comp" 
                stroke="#9333ea" 
                name="25th Percentile" 
              />
              <Line 
                type="monotone" 
                dataKey="p75Comp" 
                stroke="#16a34a" 
                name="75th Percentile" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Specialty</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>25th Percentile</TableHead>
              <TableHead>Median</TableHead>
              <TableHead>75th Percentile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.specialty}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>{formatCurrency(row.p25Comp)}</TableCell>
                <TableCell>{formatCurrency(row.medianComp)}</TableCell>
                <TableCell>{formatCurrency(row.p75Comp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MarketComparison;