import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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

// ... (previous interfaces remain the same)

export const ProductivityAnalytics = ({ data }: ProductivityAnalyticsProps) => {
  // ... (previous state and memoized values remain the same)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Productivity Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Select value={selectedPhysician} onValueChange={setSelectedPhysician}>
              <SelectTrigger>
                <SelectValue placeholder="Select Physician" />
              </SelectTrigger>
              <SelectContent>
                {physicians.map((physician) => (
                  <SelectItem key={physician} value={physician}>
                    {physician === 'all' ? 'All Physicians' : physician}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wRVUs">wRVUs</SelectItem>
                <SelectItem value="collections">Collections</SelectItem>
                <SelectItem value="visits">Visits</SelectItem>
                <SelectItem value="compensation">Compensation</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  tickFormatter={(value) => formatValue(value, selectedMetric)}
                />
                <Tooltip 
                  formatter={(value: number) => formatValue(value, selectedMetric)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric}
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total wRVUs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.totalwRVUs.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatValue(metrics.avgCollections, 'collections')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">wRVUs per Visit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.wRVUsPerVisit.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Total wRVUs</TableCell>
                <TableCell>{metrics.totalwRVUs.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="success">↑ 5.2%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Average Collections</TableCell>
                <TableCell>{formatValue(metrics.avgCollections, 'collections')}</TableCell>
                <TableCell>
                  <Badge variant="success">↑ 3.8%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Average Visits</TableCell>
                <TableCell>{metrics.avgVisits.toFixed(1)}</TableCell>
                <TableCell>
                  <Badge variant="warning">↓ 1.2%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>wRVUs per Visit</TableCell>
                <TableCell>{metrics.wRVUsPerVisit.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="success">↑ 2.5%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Collections per RVU</TableCell>
                <TableCell>{formatValue(metrics.collectionsPerRVU, 'collections')}</TableCell>
                <TableCell>
                  <Badge variant="success">↑ 4.1%</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductivityAnalytics;