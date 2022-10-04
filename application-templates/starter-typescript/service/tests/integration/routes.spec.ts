import { describe, expect, test } from '@jest/globals';
import request, { Response } from 'supertest';

import server from '../../src/index';

const HOME_CONTROLLER = '/home';
const ORDERS_CONTROLLER = '/orders';

describe('Testing HomeController', () => {
  test('GET `/home` route', async () => {
    const response: Response = await request(server).get(`${HOME_CONTROLLER}`);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Hello world from the Home Controller');
  });

  afterAll(() => server.close());
});

describe('Testing OrdersController', () => {
  test('GET `/orders` route', async () => {
    const response: Response = await request(server).get(
      `${ORDERS_CONTROLLER}`
    );
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: 'Order 1' }),
      ])
    );
  });

  afterAll(() => server.close());
});
