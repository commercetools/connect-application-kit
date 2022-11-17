// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import job from '../../src/index';
import { describe, expect } from '@jest/globals';
import { server } from '../mocks/server';
import { SDKError } from '../../src/types';
const USE_MSW = process.env.USE_MSW;

beforeAll(() => {
  if (USE_MSW) {
    server.listen();
  }
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(async () => {
  server.close();
  await new Promise((resolve) => setTimeout(() => resolve(''), 500));
});

describe('Testing Job Template', () => {
  xit('get all orders', async () => {
    //should use getAll withing a time period or records could be added
    //  or modified while fetching all, when fetching next batch in the
    //  next task use last data and last id
    const response = await job('get all orders', {
      where: USE_MSW
        ? 'where'
        : `lastModifiedAt <= "2020-07-24T09:11:13.369Z" and lastModifiedAt > "2020-07-24T09:11:13.049Z"`,
      sort: USE_MSW ? ['sort'] : ['lastModifiedAt desc'],
    }).catch((error) => console.log('got error:', error));
    const { results, ...rest } = response;
    expect(rest).toEqual({
      offset: 0,
      count: 5,
      total: 5,
      limit: 5,
    });
    expect(results.map(({ id }) => id)).toEqual(['5', '4', '3', '2', '1']);
  });
  xit('error handling', async () => {
    try {
      await job('error job', {
        where: USE_MSW
          ? 'error'
          : `lastModifiedAt <= "2020-07-24T09:11:13.369Z" and lastModifiedAt > "2020-07-24T09:11:13.049Z"`,
        sort: USE_MSW ? ['sort'] : ['lastModifiedAt desc'],
      });
      throw new Error('not this error');
    } catch (e) {
      const error = e as SDKError;
      expect(error.code).toBe(400);
      expect(error.statusCode).toBe(400);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Test error');
      expect(error.body).toEqual({
        statusCode: 400,
        message: 'Test error',
        errors: [
          {
            code: 'TestError',
            message: 'Test error',
          },
        ],
      });
    }
  });
  xit('empty record set', async () => {
    const response = await job('empty result', {
      where: USE_MSW
        ? 'empty'
        : `lastModifiedAt <= "2020-07-24T09:11:13.369Z" and lastModifiedAt > "2030-07-24T09:11:13.049Z"`,
      sort: USE_MSW ? ['sort'] : ['lastModifiedAt desc'],
    });
    expect(response).toEqual({
      offset: 0,
      results: [],
      count: 0,
      total: 0,
      limit: 0,
    });
  });
});
