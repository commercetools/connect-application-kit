import { Router } from 'express';

import { get } from '../controllers/orders.controller';

// Create the router for our app
const ordersRouter: Router = Router();

ordersRouter.get('/', get);

export default ordersRouter;