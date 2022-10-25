const { ctpClient } = require('./build.client');

const {
  createApiBuilderFromCtpClient,
} = require('@commercetools/platform-sdk');

/**
 * Create client with apiRoot
 * apiRoot can now be used to build requests to de Composable Commerce API
 */
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.PROJECT_KEY,
});

/**
 * Example code to get the Project details
 * This code has the same effect as sending a GET
 * request to the commercetools Composable Commerce API without any endpoints.
 *
 * @returns {Promise<ClientResponse<Project>>} apiRoot
 */
const getProject = async () => {
  return await apiRoot.get().execute();
};

module.exports = {
  apiRoot,
  getProject,
};
