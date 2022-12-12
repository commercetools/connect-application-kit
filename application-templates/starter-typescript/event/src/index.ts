import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';

// Import routes
import EventRoutes from './routes/event.route';
import { logger } from './utils/logger.utils';

import { readConfiguration } from './utils/config.utils';
import { errorMiddleware } from './middleware/error.middleware';

// Read env variables
readConfiguration();

const PORT = readConfiguration().port || 3000;

// Create the express app
const app: Express = express();

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/event', EventRoutes);

// Global error handler
app.use(errorMiddleware);

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default server;
