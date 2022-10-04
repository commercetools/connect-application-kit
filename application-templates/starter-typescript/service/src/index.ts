import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import bodyParser from 'body-parser';

// Import routes
import HomeRoutes from './routes/home.route';
import OrderRoutes from './routes/orders.route';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Create the express app
const app: Express = express();

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/home', HomeRoutes);
app.use('/orders', OrderRoutes);

// Listen the application
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default server;
