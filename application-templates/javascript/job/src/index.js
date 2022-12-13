require('dotenv').config();

const { allOrders } = require('./orders/fetch.orders');
const { readConfiguration } = require('./utils/config.utils');
const logger = require('./utils/logger.utils');

/**
 * Job executer. This function will be called every time a job executes.
 *
 * @param queryArgs Query arguments for commercetools sdk
 */
const executeJob = async (queryArgs) => {
  readConfiguration();

  // Get the orders
  const limitedOrdersObject = await allOrders(queryArgs);
  logger.info(`There are ${limitedOrdersObject.total} orders!`);

  return limitedOrdersObject;
};

executeJob({
  //where: `lastModifiedAt <= "2020-07-24T09:11:13.369Z" and lastModifiedAt > "2020-07-24T09:11:13.049Z"`,
  sort: ['lastModifiedAt'],
});

module.exports = executeJob;
