import { OrderPagedQueryResponse } from '@commercetools/platform-sdk';

import { createApiRoot } from '../client/create.client';
import { getAll } from '../lib';
import { GetFunction } from '../types';
const getOrderSet: GetFunction<OrderPagedQueryResponse> = async (queryArgs) => {
  // Return all the orders
  const { body } = await createApiRoot().orders().get({ queryArgs }).execute();
  return body;
};
export const allOrders: GetFunction<OrderPagedQueryResponse> =
  getAll(getOrderSet);
