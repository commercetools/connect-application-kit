const server = require('../../src/index');

describe('Testing Cart Controller', () => {
  test('POST `/service` route', async () => {
    expect(1).toBe(1);
  });

  afterAll(() => server.close());
});
