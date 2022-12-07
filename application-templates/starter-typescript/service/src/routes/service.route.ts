import { Router } from 'express';

import { post } from '../controllers/service.controller';

// Create the router for our app
const serviceRouter: Router = Router();

serviceRouter.post('/', async (req, res, next) => {
  try {
    await post(req, res);
    next();
  } catch (error) {
    next(error);
  }
});

export default serviceRouter;
