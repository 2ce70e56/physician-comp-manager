'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ProductivityChartProps {
  data: {
    wRVUs: number[];
    periods: string[];
  };
}

export function ProductivityChart({ data }: ProductivityChartProps) {
  const chartData = data.periods.map((period, index) => ({
    period,
    wRVUs: data.wRVUs[index]
  }));

  return (
    <div className="h-72">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="wRVUs" 
          stroke="#8884d8" 
          name="wRVUs" 
        />
      </LineChart>
    </div>
  );
}