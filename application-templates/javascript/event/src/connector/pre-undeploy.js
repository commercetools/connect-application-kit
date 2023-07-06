import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client.js';
import { assertError } from '../utils/assert.utils.js';
import { deleteCustomerCreateSubscription } from './actions.js';

async function preUndeploy() {
  const apiRoot = createApiRoot();
  await deleteCustomerCreateSubscription(apiRoot);
}

async function run() {
  try {
    await preUndeploy();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-undeploy failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

run();
