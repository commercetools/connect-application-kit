import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';

// Import routes
import JobRoutes from './routes/job.route.js';

import { readConfiguration } from './utils/config.utils.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import CustomError from './errors/custom.error.js';

// Read env variables
readConfiguration();

// Create the express app
const app = express();
app.disable('x-powered-by');

// Define routes
app.use('/job', JobRoutes);
app.use('*', () => {
  throw new CustomError(404, 'Path not found.');
});

// Global error handler
app.use(errorMiddleware);

export default app;
