import { Router } from 'express';

import { logger } from '../utils/logger.utils.js';

const eventRouter = Router();

eventRouter.post('/', async (req, res) => {
  logger.info('Event message received');
  res.status(200);
  res.send();
});

export default eventRouter;
