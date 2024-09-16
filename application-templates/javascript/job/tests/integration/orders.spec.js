import { expect } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import * as jobController from '../../src/controllers/job.controller';

describe('Testing router', () => {
  test('Post to non existing route', async () => {
    const response = await request(app).post('/none');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Path not found.',
    });
  });
});
describe('unexpected error', () => {
  let postMock;

  beforeEach(() => {
    // Mock the post method to throw an error
    postMock = jest.spyOn(jobController, 'post').mockImplementation(() => {
      throw new Error('Test error');
    });
  });

  afterEach(() => {
    // Restore the original implementation
    postMock.mockRestore();
  });
  test('should handle errors thrown by post method', async () => {
    // Call the route handler
    const response = await request(app).post('/job');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error' });
  });
});
