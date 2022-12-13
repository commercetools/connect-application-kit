const { createApiRoot } = require('../client/create.client');

const { getAll } = require('./modifier.orders');

const getOrderSet = async (queryArgs) => {
  // Return all the orders
  const { body } = await createApiRoot().orders().get({ queryArgs }).execute();
  return body;
};

const allOrders = getAll(getOrderSet);

module.exports = { allOrders };
