import { Counter, Histogram } from 'prom-client';
import { register } from 'prom-client';

// API Metrics
export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

export const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Business Metrics
export const providerCount = new Counter({
  name: 'providers_total',
  help: 'Total number of providers'
});

export const contractValue = new Histogram({
  name: 'contract_value_dollars',
  help: 'Distribution of contract values',
  buckets: [100000, 200000, 300000, 400000, 500000]
});