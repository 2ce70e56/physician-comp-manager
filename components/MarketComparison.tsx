import React, { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Select,
  SelectItem,
  BarChart,
  Grid,
  Col
} from '@tremor/react';

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

  const chartData = filteredData.map(d => ({
    specialty: d.specialty,
    'Median Compensation': d.medianComp,
    '25th Percentile': d.p25Comp,
    '75th Percentile': d.p75Comp,
  }));

  return (
    <Card className="mt-6">
      <Title>Market Compensation Comparison</Title>
      <Text>Compare compensation across specialties and regions</Text>
      
      <Grid numItems={2} className="gap-4 mt-4">
        <Col>
          <Select
            value={selectedSpecialty}
            onValueChange={setSelectedSpecialty}
            placeholder="Select Specialty"
          >
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            value={selectedRegion}
            onValueChange={setSelectedRegion}
            placeholder="Select Region"
          >
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </Select>
        </Col>
      </Grid>

      <BarChart
        className="mt-6"
        data={chartData}
        index="specialty"
        categories={['25th Percentile', 'Median Compensation', '75th Percentile']}
        colors={['blue', 'teal', 'indigo']}
        valueFormatter={(number) => 
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(number)
        }
        yAxisWidth={104}
      />
    </Card>
  );
};

export default MarketComparison;