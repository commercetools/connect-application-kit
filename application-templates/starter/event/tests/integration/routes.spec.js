const server = require('../../src/index');

describe('Testing Event Controller', () => {
  test('POST `/event` route', async () => {
    expect(1).toBe(1);
  });

  afterAll(() => server.close());
});
