/**
 * Send a success response to the client
 *
 * @param response Express response
 * @param statusCode The status code of the operation
 * @param updateActions The update actions that were made in the process
 * @returns Success response with 200 status code and the update actions array
 */
const sucessResponse = (response, statusCode, updateActions) => {
  let responseBody = {};

  if (updateActions) {
    responseBody.actions = updateActions;
  }

  return response.status(statusCode).json({
    ...responseBody,
  });
};

/**
 * Send a error response to the client
 * @param response Express response
 * @param data The error data
 * @returns Error response with 400 status code and the errors array
 */
const errorResponse = (response, data) => {
  let responseBody = {};

  if (data) {
    responseBody.errors = data.errors;
  }

  return response.status(400).json({
    ...responseBody,
  });
};

module.exports = { sucessResponse, errorResponse };
