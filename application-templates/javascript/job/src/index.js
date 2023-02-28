import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';

// Import routes
import JobRoutes from './routes/job.route.js';

// Import logger
import { logger } from './utils/logger.utils.js';

import { readConfiguration } from './utils/config.utils.js';
import { errorMiddleware } from './middleware/error.middleware.js';

// Read env variables
readConfiguration();

const PORT = 8080;

// Create the express app
const app = express();

// Define routes
app.use('/job', JobRoutes);

// Global error handler
app.use(errorMiddleware);

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Job application listening on port ${PORT}`);
});

export default server;
