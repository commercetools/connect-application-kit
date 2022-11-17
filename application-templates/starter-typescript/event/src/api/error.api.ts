import { Response } from 'express';
//@todo: add error as documented here
//  https://docs.commercetools.com/api/projects/api-extensions
/**
 * Send an API error to the client
 *
 * @param {number} statusCode The status code of the error
 * @param {string} errorMessage The error message
 * @param {Response} res The response object
 */
export const apiError = (
  statusCode: number,
  errorMessage: string,
  res: Response
) => {
  res.status(statusCode).send({ error: errorMessage });
};
