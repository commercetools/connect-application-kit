const { Router } = require('express');

const { post } = require('../controllers/service.controller');

// Create the router for our app
const serviceRouter = Router();

serviceRouter.post('/', post);

module.exports = serviceRouter;
