import { Response } from 'express';

/**
 *
 * @param statusCode
 * @param errorMessage
 * @param res
 */
export const apiError = (
  statusCode: number,
  errorMessage: string,
  res: Response
) => {
  res.status(statusCode).send({ error: errorMessage });
};
