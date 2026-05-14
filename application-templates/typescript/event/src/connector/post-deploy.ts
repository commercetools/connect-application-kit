import { createApiRoot } from '../client/create.client';
import { assertError } from '../utils/assert.utils';
import { Config } from '../interfaces/config.interface';
import { createCustomerCreateSubscription } from './actions';
import { readConfiguration } from '../utils/config.utils';

async function postDeploy(config: Config): Promise<void> {
  const apiRoot = createApiRoot();
  await createCustomerCreateSubscription(apiRoot, config);
}

async function run(): Promise<void> {
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
