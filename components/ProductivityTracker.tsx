'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProductivityMetrics {
  wRVUs: number;
  target: number;
  collections: number;
  visits: number;
  date: string;
}

export function ProductivityTracker() {
  const [metrics, setMetrics] = useState<ProductivityMetrics[]>([
    { wRVUs: 420, target: 400, collections: 125000, visits: 180, date: '2025-01' },
    { wRVUs: 380, target: 400, collections: 115000, visits: 165, date: '2025-02' },
    { wRVUs: 450, target: 400, collections: 135000, visits: 195, date: '2025-03' },
    { wRVUs: 410, target: 400, collections: 122000, visits: 175, date: '2025-04' },
    { wRVUs: 440, target: 400, collections: 130000, visits: 188, date: '2025-05' },
    { wRVUs: 425, target: 400, collections: 127000, visits: 182, date: '2025-06' }
  ]);

  const calculateProgress = () => {
    const totalWRVUs = metrics.reduce((sum, metric) => sum + metric.wRVUs, 0);
    const totalTarget = metrics.reduce((sum, metric) => sum + metric.target, 0);
    return (totalWRVUs / totalTarget) * 100;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getProgressStatus = (progress: number) => {
    if (progress >= 100) return 'success';
    if (progress >= 90) return 'warning';
    return 'destructive';
  };

  const progress = calculateProgress();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress to Target</span>
              <Badge variant={getProgressStatus(progress)}>
                {progress.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Total wRVUs</span>
              <p className="text-2xl font-bold">
                {metrics.reduce((sum, m) => sum + m.wRVUs, 0).toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Total Collections</span>
              <p className="text-2xl font-bold">
                {formatCurrency(metrics.reduce((sum, m) => sum + m.collections, 0))}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Total Visits</span>
              <p className="text-2xl font-bold">
                {metrics.reduce((sum, m) => sum + m.visits, 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short' });
                  }}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'collections') return formatCurrency(value as number);
                    return value;
                  }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="wRVUs" 
                  stroke="#2563eb" 
                  name="wRVUs"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="target" 
                  stroke="#16a34a" 
                  strokeDasharray="5 5" 
                  name="Target"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="collections" 
                  stroke="#9333ea" 
                  name="Collections"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => {
                // Implementation for downloading detailed report
                console.log('Downloading report...');
              }}
            >
              Download Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}