import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import CustomError from '../errors/custom.error';


export const errorMiddleware: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    
      res.status(error.statusCode as number).json({
        message: error.message,
        errors: error.errors,
        stack: error.stack,
      });

      return;
    
  }

  res.status(500).send('Internal server error: ' + error.stack);
};
