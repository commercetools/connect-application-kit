import { ctpClient } from './build.client';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { readConfiguration } from '../utils/config.utils';

/**
 * Create client with apiRoot
 * apiRoot can now be used to build requests to de Composable Commerce API
 */
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: readConfiguration().projectKey,
});

/**
 * Example code to get the Project details
 * This code has the same effect as sending a GET
 * request to the commercetools Composable Commerce API without any endpoints.
 *
 * @returns {Promise<ClientResponse<Project>>} apiRoot
 */
export const getProject = async () => {
  return await apiRoot.get().execute();
};
