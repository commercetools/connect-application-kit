import { Router } from 'express';

import { get } from '../controllers/home.controller';

// Create the router for our app
const homeRouter: Router = Router();

homeRouter.get('/', get);

export default homeRouter;
