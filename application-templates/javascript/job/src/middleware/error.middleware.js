import CustomError from '../errors/custom.error.js';

export const errorMiddleware = (error, _req, res) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors,
      stack: isDevelopment ? error.stack : undefined,
    });

    return;
  }

  res.status(500).send(isDevelopment ? error : 'Internal server error');
};