import CustomError from '../errors/custom.error.js';

export const errorMiddleware = (error, _req, res, _next) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors,
      stack: isDevelopment ? error.stack : undefined,
    });

    return;
  }
  res
    .status(500)
    .send(
      isDevelopment
        ? { messge: error.message }
        : { message: 'Internal server error' }
    );
};
