const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const EventRoutes = require('./routes/event.routes');

const { readConfiguration } = require('./utils/config.utils');
const { envVarsError } = require('./errors/handling.errors');

// Validate our env vars
envVarsError(readConfiguration());

const PORT = readConfiguration().port;

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
app.use('/event', EventRoutes);

// Listen the application
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

module.exports = server;
