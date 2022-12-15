import { UpdateAction } from '@commercetools/sdk-client-v2';
import { Response } from 'express';
import { ResponseInterfaceSuccess } from '../interfaces/response.interface';

/**
 * Send a success response to the client
 *
 * @param {Response} response Express response
 * @param {number} statusCode The status code of the operation
 * @param {Array<UpdateAction>} updateActions The update actions that were made in the process
 * @returns Success response with 200 status code and the update actions array
 */
export const apiSuccess = (
  statusCode: number,
  updateActions: Array<UpdateAction>,
  response: Response
) => {
  const responseBody = {} as ResponseInterfaceSuccess;

  if (updateActions) {
    responseBody.actions = updateActions;
  }

  response.status(statusCode).json({
    ...responseBody,
  });
};
