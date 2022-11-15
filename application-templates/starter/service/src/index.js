const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');

require('dotenv').config();

const PORT = process.env.PORT;

// Import routes
const ServiceRoutes = require('./routes/service.routes');

// Create the express app
const app = express();

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Global error handler
app.use((error, req, res, next) => {
  // response to user with 403 error and details
  if (error) {
    next(error);
  } else {
    next();
  }
});

// Define routes
app.use('/service', ServiceRoutes);

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

module.exports = server;
