import { getProject } from './client/create.client';
import { envVarsError } from './errors/handling.errors';
import { allOrdersWithLimit } from './orders/fetch';
import { readConfiguration } from './utils/config.utils';

/**
 * Job executer. This function will be called everytime a job executes.
 *
 * @param jobName The name of the job for logging purposes
 */
const exectuteJob = async (jobName: string) => {
  try {
    // Validate our env vars
    envVarsError(readConfiguration());

    // Get project infos
    const project = await getProject();

    // Get the orders
    const limitedOrdersObject = await allOrdersWithLimit();

    // Simple log. Do what you want with the info
    console.log(
      `There are ${limitedOrdersObject.body.total} orders in the ${project.body.name} project`
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `There was an unexpected error on job ${jobName}: ` + error.message
      );
    }
  }
};

exectuteJob('Fetch all orders');
