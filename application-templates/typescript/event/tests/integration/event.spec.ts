import { describe, expect } from '@jest/globals';
import { CustomerCreatedMessage, Customer } from '@commercetools/platform-sdk';
import request from 'supertest';
import app from '../../src/app';
import { createApiRoot } from '../../src/client/create.client';
import { readConfiguration } from '../../src/utils/config.utils';

jest.mock('../../src/client/create.client', () => {
  const mockCreateApiRoot = jest.fn();
  return {
    createApiRoot: mockCreateApiRoot,
  };
});
jest.mock('../../src/utils/config.utils');

const customerId = 'd93a8493-1bfd-4e2d-8b46-20a765dd0978';

const customer: Customer = {
  id: customerId,
  createdAt: '',
  lastModifiedAt: '',
  version: 0,
  email: '',
  isEmailVerified: true,
  addresses: [],
  authenticationMode: 'Password',
};

const orderCreatedMessage: CustomerCreatedMessage = {
  createdAt: '',
  id: '',
  lastModifiedAt: '',
  resource: { id: customerId, typeId: 'customer' },
  resourceVersion: 0,
  sequenceNumber: 0,
  type: 'CustomerCreated',
  version: 0,
  customer: customer,
};

describe('Testing Event Controller', () => {
  beforeEach(() => {
    (readConfiguration as jest.Mock).mockClear();
  });
  test('Customer Created (Mocked)', async () => {
    // Define a mock root to be returned
    const withId = jest.fn().mockReturnValueOnce({
      get: jest.fn().mockReturnValueOnce({
        execute: jest.fn().mockReturnValueOnce(customer),
      }),
    });
    const mockRoot = {
      customers: jest.fn().mockReturnValueOnce({
        withId: withId,
      }),
    };

    // Set the mock implementation for createApiRoot to return mockRoot
    (createApiRoot as jest.Mock).mockReturnValueOnce(mockRoot);

    const response = await request(app)
      .post('/event')
      .send({
        message: {
          data: Buffer.from(JSON.stringify(orderCreatedMessage)).toString(
            'base64'
          ),
        },
      });
    expect(response.status).toBe(204);
    expect(withId).toHaveBeenCalledWith({ ID: customerId });
  });

  /*
   * This Test really calls the commercetools APIs. To do so,
   * - remove the mocking code in line 8-14
   * - configure a "real" customerId
   * - remove the skip below
   *
   * The code below comes in handy to test during development.
   */
  it.skip('Customer Created', async () => {
    const response = await request(app)
      .post('/event')
      .send({
        message: {
          data: Buffer.from(JSON.stringify(orderCreatedMessage)).toString(
            'base64'
          ),
        },
      });
    expect(response.status).toBe(204);
  });
});
