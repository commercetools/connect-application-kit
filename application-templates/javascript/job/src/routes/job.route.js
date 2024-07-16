import { Router } from 'express';

import { post } from '../controllers/job.controller.js';

// Create the router for our app
const jobRouter = Router();

jobRouter.post('/', async (req, res, next) => {
  try {
    await post(req, res);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

export default jobRouter;
