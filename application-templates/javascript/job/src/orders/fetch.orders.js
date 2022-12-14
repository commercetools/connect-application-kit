import { createApiRoot } from '../client/create.client.js';
import { getAll } from './modifier.order.js';

const getOrderSet = async (queryArgs) => {
  // Return all the orders
  const { body } = await createApiRoot().orders().get({ queryArgs }).execute();
  return body;
};

export const allOrders = getAll(getOrderSet);
