import { Router } from 'express';

import { post } from '../controllers/job.controller';

// Create the router for our app
const jobRouter: Router = Router();

jobRouter.post('/', (req, res, next) => {
  try {
    post(req, res);
  } catch (error) {
    next(error);
  }
});

export default jobRouter;
