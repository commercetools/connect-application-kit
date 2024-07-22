import { Router } from 'express';
import { logger } from '../utils/logger.utils.js';
import { post } from '../controllers/service.controller.js';

const serviceRouter = Router();

serviceRouter.post('/', (req, res, next) => {
  logger.info('Cart update extension executed');

  try {
    post(req, res);
  } catch (error) {
    next(error);
  }
});

export default serviceRouter;
