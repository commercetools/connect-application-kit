const { createClient } = require('./build.client');

const {
  createApiBuilderFromCtpClient,
} = require('@commercetools/platform-sdk');

const { readConfiguration } = require('../utils/config.utils');

/**
 * Create client with apiRoot
 * apiRoot can now be used to build requests to de Composable Commerce API
 */
const createApiRoot = ((root) => () => {
  if (root) {
    return root;
  }

  root = createApiBuilderFromCtpClient(createClient()).withProjectKey({
    projectKey: readConfiguration().projectKey,
  });

  return root;
})();

/**
 * Example code to get the Project details
 * This code has the same effect as sending a GET
 * request to the commercetools Composable Commerce API without any endpoints.
 *
 * @returns {Promise<ClientResponse<Project>>} apiRoot
 */
const getProject = async () => {
  return await createApiRoot().get().execute();
};

module.exports = {
  createApiRoot,
  getProject,
};
