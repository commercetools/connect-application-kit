import { UpdateAction } from '@commercetools/sdk-client-v2';
import { Response } from 'express';

import {
  ResponseInterfaceSuccess,
  ResponseInterfaceError,
} from '../interfaces/response.interface';

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
