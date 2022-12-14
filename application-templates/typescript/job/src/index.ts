import * as dotenv from 'dotenv';
dotenv.config();

import { allOrders } from './orders/fetch.orders';
import { QueryArgs } from './types/index.types';
import { readConfiguration } from './utils/config.utils';
import { logger } from './utils/logger.utils';

/**
 * Job executer. This function will be called every time a job executes.
 *
 * @param queryArgs Query arguments for commercetools sdk
 */
const executeJob = async (queryArgs: QueryArgs) => {
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
