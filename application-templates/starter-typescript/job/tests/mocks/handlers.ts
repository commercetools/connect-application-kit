// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { rest } from 'msw';
import ordersData from './ordersData';

const log = (...args: unknown[]) => {
  if (process.env.LOG_MSW) {
    console.log(...args);
  }
};
const PROJECT_KEY = process.env.PROJECT_KEY;
export const handlers = [
  rest.post('*', (req, res, ctx) => {
    log('POST', req.url.pathname);
    if (req.url.pathname === '/oauth/token') {
      return res(
        ctx.status(200),
        ctx.json({
          access_token: 'my token',
          token_type: 'Bearer',
          expires_in: 172800,
          scope: 'my scope',
        })
      );
    }
    return req.passthrough();
  }),
  rest.get('*', (req, res, ctx) => {
    log('GET:', req.url.pathname);
    if (req.url.pathname === `/${PROJECT_KEY}/orders`) {
      log('query:', JSON.stringify([...req.url.searchParams.entries()]));
      const data =
        ordersData[JSON.stringify([...req.url.searchParams.entries()])];
      if (!data) {
        log('not found, error');
      }
      return data
        ? res(ctx.status(200), ctx.json(data))
        : res(
            ctx.status(400),
            ctx.json({
              statusCode: 400,
              message: 'Test error',
              errors: [
                {
                  code: 'TestError',
                  message: 'Test error',
                },
              ],
            })
          );
    }
    log('   passthrough');
    return req.passthrough();
  }),
];
