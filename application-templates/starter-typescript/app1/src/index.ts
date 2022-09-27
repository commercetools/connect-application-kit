import express, { Express, Request, Response } from 'express';

// Define the port
const PORT = 3000;

// Create the express app
const app: Express = express();

// Basic route
app.get('/', (request: Request, response: Response) => {
  response.send({
    status: 200,
    body: 'Hello world from the typescript server',
  });
});

// Listen the application
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default app;
