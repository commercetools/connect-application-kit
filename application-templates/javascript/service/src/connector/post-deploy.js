import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client.js';
import { assertError, assertString } from '../utils/assert.utils.js';
import {
  createCustomCartDiscountType,
  createCartUpdateExtension,
} from './actions.js';

const CONNECT_APPLICATION_URL_KEY = 'CONNECT_SERVICE_URL';

async function postDeploy(properties) {
  const applicationUrl = properties.get(CONNECT_APPLICATION_URL_KEY);

  assertString(applicationUrl, CONNECT_APPLICATION_URL_KEY);

  const apiRoot = createApiRoot();
  await createCartUpdateExtension(apiRoot, applicationUrl);
  await createCustomCartDiscountType(apiRoot);
}

async function run() {
  try {
    const properties = new Map(Object.entries(process.env));
    await postDeploy(properties);
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-deploy failed: ${error.message}`);
    process.exitCode = 1;
  }
}

run();
