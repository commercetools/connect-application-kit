import { allOrders } from './orders/fetch';
import { QueryArgs } from './types';
import { logger } from './utils/logger';

/**
 * Job executer. This function will be called everytime a job executes.
 *
 * @param jobName The name of the job for logging purposes
 */
const executeJob = async (jobName: string, queryArgs: QueryArgs) => {
  // Get the orders
  const limitedOrdersObject = await allOrders(queryArgs);
  logger.info(`There are ${limitedOrdersObject.total} orders!`);
  return limitedOrdersObject;
};

export default executeJob;
