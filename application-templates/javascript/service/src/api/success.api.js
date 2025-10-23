/**
 * Send a success response to the client
 *
 * @typedef {import("@commercetools/platform-sdk").CartUpdateAction} CartUpdateAction
 * @typedef {import("express").Response} Response
 *
 * @param {Response} response Express response
 * @param {number} statusCode The status code of the operation
 * @param {Array<CartUpdateAction>} updateActions The update actions that were made in the process
 * @returns Success response with 200 status code and the update actions array
 */
export const apiSuccess = (statusCode, updateActions, response) => {
  const responseBody = {};

  if (updateActions) {
    responseBody.actions = updateActions;
  }

  response.status(statusCode).json({
    ...responseBody,
  });
};
