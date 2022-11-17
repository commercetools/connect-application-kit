/**
 * Send a success response to the client
 *
 * @param {Response} response Express response
 * @param {number} statusCode The status code of the operation
 * @param {Array<UpdateAction>} updateActions The update actions that were made in the process
 * @returns Success response with 200 status code and the update actions array
 */
const apiSuccess = (statusCode, updateActions, response) => {
  let responseBody = {};

  if (updateActions) {
    responseBody.actions = updateActions;
  }

  response.status(statusCode).json({
    ...responseBody,
  });
};

module.exports = { apiSuccess };
