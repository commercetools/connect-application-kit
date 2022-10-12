import { Response } from 'express';
import { ResponseInterface } from '../interfaces/response.interface';

export const sucessResponse = (
  response: Response,
  statusCode: number,
  message: string,
  data: Object
) => {
  const responseBody: ResponseInterface = { status: 'success' };

  if (message !== '') {
    responseBody.message = message;
  }

  if (data) {
    responseBody.data = data;
  }

  return response.status(statusCode).json({
    ...responseBody,
  });
};

export const errorResponse = () => {};
