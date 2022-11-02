import * as dotenv from 'dotenv';
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import bodyParser from 'body-parser';

dotenv.config();

// Import routes
// eslint-disable-next-line import/first
import EventRoutes from './routes/event.route';

const PORT = process.env.PORT || 3000;

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
app.use('/event', EventRoutes);

// Listen the application
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default server;
