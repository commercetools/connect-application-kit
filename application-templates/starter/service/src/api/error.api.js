/**
 * Send an API error to the client
 *
 * @param {number} statusCode The status code of the error
 * @param {string} errorMessage The error message
 * @param {Response} res The response object
 */
const apiError = (statusCode, errorMessage, res) => {
  res.status(statusCode).send({ error: errorMessage });
};

module.exports = { apiError };
