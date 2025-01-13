'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useData } from '@/lib/context/data-context';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function AnalyticsDashboard() {
  const { providers, contracts } = useData();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<string>('ytd');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate specialty-based metrics
  const specialtyMetrics = providers.reduce((acc, provider) => {
    const specialty = provider.specialty;
    if (!acc[specialty]) {
      acc[specialty] = {
        count: 0,
        totalWRVUs: 0,
        totalCompensation: 0,
        avgWRVUs: 0,
        avgCompensation: 0
      };
    }
    
    acc[specialty].count++;
    acc[specialty].totalWRVUs += provider.metrics?.ytdWRVUs || 0;
    acc[specialty].totalCompensation += provider.metrics?.ytdCompensation || 0;
    acc[specialty].avgWRVUs = acc[specialty].totalWRVUs / acc[specialty].count;
    acc[specialty].avgCompensation = acc[specialty].totalCompensation / acc[specialty].count;
    
    return acc;
  }, {} as Record<string, any>);

  // Transform for charts
  const specialtyData = Object.entries(specialtyMetrics).map(([specialty, metrics]) => ({
    specialty,
    ...metrics
  }));

  // Calculate performance trends
  const performanceTrends = providers
    .filter(p => selectedSpecialty === 'all' || p.specialty === selectedSpecialty)
    .reduce((acc, provider) => {
      provider.performance?.forEach(perf => {
        const month = perf.month;
        if (!acc[month]) {
          acc[month] = {
            month,
            totalWRVUs: 0,
            averageWRVUs: 0,
            totalCollections: 0,
            averageCollections: 0,
            providerCount: 0
          };
        }
        acc[month].totalWRVUs += perf.wRVUs;
        acc[month].totalCollections += perf.collections;
        acc[month].providerCount++;
        acc[month].averageWRVUs = acc[month].totalWRVUs / acc[month].providerCount;
        acc[month].averageCollections = acc[month].totalCollections / acc[month].providerCount;
      });
      return acc;
    }, {} as Record<string, any>);

  const trendsData = Object.values(performanceTrends);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {Object.keys(specialtyMetrics).map(specialty => (
              <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ytd">Year to Date</SelectItem>
            <SelectItem value="last12">Last 12 Months</SelectItem>
            <SelectItem value="last6">Last 6 Months</SelectItem>
            <SelectItem value="last3">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compensation by Specialty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialtyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="specialty" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="avgCompensation" name="Average Compensation" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productivity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="averageWRVUs"
                    name="Average wRVUs"
                    stroke="#2563eb"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="averageCollections"
                    name="Average Collections"
                    stroke="#16a34a"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Provider Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialtyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="specialty" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Provider Count" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productivity Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialtyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="specialty" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgWRVUs" name="Average wRVUs" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}