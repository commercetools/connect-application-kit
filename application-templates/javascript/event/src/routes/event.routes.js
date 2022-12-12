const { Router } = require('express');

const { post } = require('../controllers/event.controller');

// Create the router for our app
const eventRouter = Router();

eventRouter.post('/', post);

module.exports = eventRouter;
