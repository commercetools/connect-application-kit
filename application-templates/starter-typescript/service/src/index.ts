import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import bodyParser from 'body-parser';

// Import routes
import ServiceRoutes from './routes/service.route';

import { readConfiguration } from './utils/config.utils';

import { envVarsError } from './errors/handling.errors';

// Validate our env vars
envVarsError(readConfiguration());
console.log();

const PORT = readConfiguration().port;

// Create the express app
const app: Express = express();

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Global error handler
app.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // response to user with 403 error and details
    if (error) {
      next(error);
    } else {
      next();
    }
  }
);

// Define routes
app.use('/service', ServiceRoutes);

// Listen the application
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default server;
