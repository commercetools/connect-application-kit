import app from '../src/index';
import { describe, expect, test } from '@jest/globals';
import { request } from 'http';

describe('Test suite to verify our routes', () => {
  test("Test the main route '/' ", async () => {
    const response = await request(app).get('/');
    console.log(response);
  });
});
