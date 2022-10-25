import { UpdateAction } from '@commercetools/sdk-client-v2';
import { Response } from 'express';

import {
  ResponseInterfaceSuccess,
  ResponseInterfaceError,
} from '../interfaces/response.interface';

/**
 * Send a success response to the client
 *
 * @param {Response} response Express response
 * @param {number} statusCode The status code of the operation
 * @param {Array<UpdateAction>} updateActions The update actions that were made in the process
 * @returns Success response with 200 status code and the update actions array
 */
export const sucessResponse = (
  response: Response,
  statusCode: number,
  updateActions: Array<UpdateAction>
) => {
  let responseBody = {} as ResponseInterfaceSuccess;

  if (updateActions) {
    responseBody.actions = updateActions;
  }

  return response.status(statusCode).json({
    ...responseBody,
  });
};

/**
 * Send a error response to the client
 * @param {Response} response Express response
 * @param {any} data The error data
 * @returns Error response with 400 status code and the errors array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorResponse = (response: Response, data: any) => {
  let responseBody = {} as ResponseInterfaceError;

  if (data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responseBody.errors = data.errors;
  }

  return response.status(400).json({
    ...responseBody,
  });
};
