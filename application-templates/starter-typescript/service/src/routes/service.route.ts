import { Router } from 'express';

import { post } from '../controllers/service.controller';

// Create the router for our app
const serviceRouter: Router = Router();

serviceRouter.post('/', post);

export default serviceRouter;
