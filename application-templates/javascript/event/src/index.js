import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';

// Import routes
import EventRoutes from './routes/event.route.js';
import { logger } from './utils/logger.utils.js';

import { readConfiguration } from './utils/config.utils.js';
import { errorMiddleware } from './middleware/error.middleware.js';

// Read env variables
readConfiguration();

const PORT = 8080;

// Create the express app
const app = express();

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/event', EventRoutes);

// Global error handler
app.use(errorMiddleware);

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Event application listening on port ${PORT}`);
});

export default server;
