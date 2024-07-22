import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { post } from '../controllers/event.controller';

const eventRouter: Router = Router();

eventRouter.post('/', (req, res, next) => {
  logger.info('Event message received');
  try {
    post(req, res);
  } catch (error) {
    next(error);
  }
});

export default eventRouter;
