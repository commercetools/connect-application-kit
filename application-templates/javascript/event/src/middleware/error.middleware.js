import CustomError from '../errors/custom.error.js';

export const errorMiddleware = (error, _req, res, _next) => {
  if (error instanceof CustomError) {
    if (typeof error.statusCode === 'number') {
      res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
        stack: error.stack
      });

      return;
    }
  }

  res.status(500).send('Internal server error: ' + error.stack);
};
