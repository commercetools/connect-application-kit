import { Router } from 'express';

import { post } from '../controllers/event.controller';

// Create the router for our app
const eventRouter: Router = Router();

eventRouter.post('/', async (req, res, next) => {
  try {
    await post(req, res);
    next();
  } catch (error) {
    next(error);
  }
});

export default eventRouter;
