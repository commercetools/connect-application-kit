import express, { Express } from 'express';
import bodyParser from 'body-parser';

// Import routes
import ServiceRoutes from './routes/service.route';
// Import logger
import { logger } from './utils/logger.utils';

import { readConfiguration } from './utils/config.utils';
import { envVarsError } from './errors/handling.errors';
import { errorMiddleware } from './middleware/error.middleware';

// Validate our env vars
envVarsError(readConfiguration());

const PORT = readConfiguration().port;

// Create the express app
const app: Express = express();

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/service', ServiceRoutes);

// Global error handler
app.use(errorMiddleware);

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default server;
