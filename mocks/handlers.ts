import { rest } from 'msw';

export const handlers = [
  rest.get('/api/providers/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: req.params.id,
        firstName: 'John',
        lastName: 'Doe',
        specialty: 'Cardiology',
        type: 'PHYSICIAN'
      })
    );
  }),

  rest.get('/api/productivity', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          period: '2025-01',
          wRVUs: 500,
          encounters: 100
        }
      ])
    );
  }),

  rest.get('/api/market-data/comparison', (req, res, ctx) => {
    return res(
      ctx.json({
        specialty: 'Cardiology',
        metric: 'compensation',
        percentiles: {
          p25: 300000,
          p50: 400000,
          p75: 500000
        }
      })
    );
  })
];