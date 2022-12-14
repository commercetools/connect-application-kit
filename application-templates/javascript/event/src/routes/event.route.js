import { Router } from 'express';

import { post } from '../controllers/event.controller.js';

// Create the router for our app
const eventRouter = Router();

eventRouter.post('/', async (req, res, next) => {
  try {
    await post(req, res);
    next();
  } catch (error) {
    next(error);
  }
});

export default eventRouter;
