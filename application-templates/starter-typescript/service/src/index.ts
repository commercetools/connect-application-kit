import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import bodyParser from 'body-parser';

// require('dotenv').config();
dotenv.config();

// Import routes
// eslint-disable-next-line import/first
import ServiceRoutes from './routes/service.route';
// eslint-disable-next-line import/first
import OrderRoutes from './routes/orders.route';
// eslint-disable-next-line import/first
import { getProject } from './client/create.client';

getProject().then(console.log).catch(console.error);

const PORT = process.env.PORT;

// Create the express app
const app: Express = express();

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/service', ServiceRoutes);
app.use('/orders', OrderRoutes);

// Listen the application
const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default server;
