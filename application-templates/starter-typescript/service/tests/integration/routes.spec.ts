import { describe, expect, test } from '@jest/globals';
import request, { Response } from 'supertest';
import body from '../../src/json/updateCart.json';

import server from '../../src/index';

describe('Testing Cart Controller', () => {
  test('POST `/service` route', async () => {
    const response: Response = await request(server)
      .post('/service/')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    console.log(response);

    /*
    const response: Response = await request(server).get(`${HOME_CONTROLLER}`);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Hello world from the Home Controller');
    */
  });

  afterAll(() => server.close());
});
