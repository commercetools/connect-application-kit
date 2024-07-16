import { Router } from 'express';

import { logger } from '../utils/logger.utils.js';
import { post } from '../controllers/event.controller.js';

const eventRouter = Router();

eventRouter.post('/', async (req, res, next) => {
  logger.info('Event message received');
  
  try {
    await post(req.body);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

export default eventRouter;
