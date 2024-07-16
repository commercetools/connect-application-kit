import { ErrorRequestHandler, Request, Response } from 'express';
import CustomError from '../errors/custom.error';

export const errorMiddleware: ErrorRequestHandler = (
  error: Error,
  _: Request,
  res: Response,
) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode as number).json({
      message: error.message,
      errors: error.errors,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });

    return;
  }

  res.status(500).send('Internal server error: ' + process.env.NODE_ENV === 'development' ? error.stack : undefined);
};
