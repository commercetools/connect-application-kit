import { createApiRoot } from '../client/create.client.js';
import { assertError } from '../utils/assert.utils.js';
import { createCustomerCreateSubscription } from './actions.js';
import { readConfiguration } from '../utils/config.utils.js';

async function postDeploy(config) {
  const apiRoot = createApiRoot();
  await createCustomerCreateSubscription(apiRoot, config);
}

async function run() {
  try {
    const config = readConfiguration();
    await postDeploy(config);
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-deploy failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

run();
