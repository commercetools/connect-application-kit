import 'dotenv/config';
import { allOrders } from './orders/fetch.orders.js';
import { readConfiguration } from './utils/config.utils.js';
import { logger } from './utils/logger.utils.js';

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

export default executeJob;
