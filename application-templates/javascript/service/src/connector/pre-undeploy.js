import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client.js';
import { assertError } from '../utils/assert.utils.js';
import { deleteCartUpdateExtension } from './actions.js';

async function preUndeploy() {
  const apiRoot = createApiRoot();
  await deleteCartUpdateExtension(apiRoot);
}

async function run() {
  try {
    await preUndeploy();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Pre-undeploy failed: ${error.message}`);
    process.exitCode = 1;
  }
}

run();
