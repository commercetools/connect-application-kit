// import { getProject } from './client/create.client';
import { allOrders } from './orders/fetch';
import { QueryArgs } from './types';

/**
 * Job executer. This function will be called everytime a job executes.
 *
 * @param jobName The name of the job for logging purposes
 */
const executeJob = async (jobName: string, queryArgs: QueryArgs) => {
  // Get the orders
  const limitedOrdersObject = await allOrders(queryArgs);
  return limitedOrdersObject;
};
export default executeJob;
