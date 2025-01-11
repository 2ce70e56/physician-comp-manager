export function calculateProductivityMetrics(data: any[]) {
  const wRVUs = data.map(d => d.wRVUs);
  const encounters = data.map(d => d.encounters);

  return {
    total: {
      wRVUs: sum(wRVUs),
      encounters: sum(encounters)
    },
    average: {
      wRVUs: average(wRVUs),
      encounters: average(encounters)
    },
    trend: calculateTrend(wRVUs)
  };
}

function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

function average(values: number[]): number {
  return sum(values) / values.length;
}

function calculateTrend(values: number[]): 'increasing' | 'decreasing' | 'stable' {
  if (values.length < 2) return 'stable';
  
  const firstHalf = values.slice(0, Math.floor(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));
  
  const firstAvg = average(firstHalf);
  const secondAvg = average(secondHalf);
  
  const changePct = ((secondAvg - firstAvg) / firstAvg) * 100;
  
  if (changePct > 5) return 'increasing';
  if (changePct < -5) return 'decreasing';
  return 'stable';
}