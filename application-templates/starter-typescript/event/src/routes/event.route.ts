import { Router } from 'express';

import { post } from '../controllers/event.controller';

// Create the router for our app
const eventRouter: Router = Router();

eventRouter.post('/', post);

export default eventRouter;
