import CustomError from '../errors/custom.error.js';

/**
 * Middleware for error handling
 */
export const errorMiddleware = (error, req, res, _next) => {
  if (error instanceof CustomError) {
    if (typeof error.statusCode === 'number') {
      res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
      });

      return;
    }
  }

  res.status(500).send('Internal server error');
};
