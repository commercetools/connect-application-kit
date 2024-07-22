import { Router } from 'express';

import { logger } from '../utils/logger.utils.js';
import { post } from '../controllers/event.controller.js';

const eventRouter = Router();

eventRouter.post('/', (req, res, next) => {
  logger.info('Event message received');
  
  try {
    post(req, res);
  } catch (error) {
    next(error);
  }
});

export default eventRouter;
