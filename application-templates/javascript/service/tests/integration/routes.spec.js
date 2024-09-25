import { expect } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import * as serviceController from '../../src/controllers/service.controller';
import { readConfiguration } from '../../src/utils/config.utils';

jest.mock('../../src/utils/config.utils');
describe('Testing router', () => {
  beforeEach(() => {
    readConfiguration.mockClear();
  });
  test('Post to non existing route', async () => {
    const response = await request(app).post('/none');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Path not found.',
    });
  });

  test('Post invalid body', async () => {
    const response = await request(app).post('/service').send({
      message: 'hello world',
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Bad request - Missing body parameters.',
    });
  });

  test('Post empty body', async () => {
    const response = await request(app).post('/service');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Bad request - Missing body parameters.',
    });
  });
});

describe('unexpected error', () => {
  let postMock;

  beforeEach(() => {
    // Mock the post method to throw an error
    postMock = jest.spyOn(serviceController, 'post').mockImplementation(() => {
      throw new Error('Test error');
    });
  });

  test('should handle errors thrown by post method', async () => {
    // Call the route handler
    const response = await request(app).post('/service');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error' });
  });

  afterEach(() => {
    // Restore the original implementation
    postMock.mockRestore();
  });
});
