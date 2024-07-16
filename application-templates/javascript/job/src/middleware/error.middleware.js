import CustomError from '../errors/custom.error.js';

export const errorMiddleware = (error, _req, res) => {
  if (error instanceof CustomError) {
    if (typeof error.statusCode === 'number') {
      res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });

      return;
    }
  }

  res.status(500).send('Internal server error: ' + process.env.NODE_ENV === 'development' ? error.stack : undefined);
};

