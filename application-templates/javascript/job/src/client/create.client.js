import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { createClient } from './build.client.js';
import { readConfiguration } from '../utils/config.utils.js';

/**
 * Create client with apiRoot
 * apiRoot can now be used to build requests to de Composable Commerce API
 */
export const createApiRoot = ((root) => () => {
  if (root) {
    return root;
  }

  const { projectKey, region } = readConfiguration();

  // Pass baseUri explicitly: the SDK defaults it to europe-west1.gcp, which
  // would otherwise show up in request objects and logs for other regions.
  root = createApiBuilderFromCtpClient(
    createClient(),
    `https://api.${region}.commercetools.com`
  ).withProjectKey({ projectKey });

  return root;
})();

/**
 * Example code to get the Project details
 * This code has the same effect as sending a GET
 * request to the commercetools Composable Commerce API without any endpoints.
 */
export const getProject = async () => {
  return await createApiRoot().get().execute();
};
