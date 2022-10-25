const { sucessResponse, errorResponse } = require('../utils/response.utils');
const { cartController } = require('./cart.controller');

/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 *
 * @param request The express request
 * @param response The express response
 * @returns
 */
const post = async (request, response) => {
  // Deserialize the action and resouce from the body
  const { action, resource } = request.body;

  // Identify the type of resource in order to redirect
  // to the correct controller
  switch (resource.typeId) {
    case 'cart':
      try {
        const data = await cartController(action, resource);

        if (data.statusCode === 200) {
          return sucessResponse(response, data.statusCode, data.actions);
        }

        return errorResponse(response, data);
      } catch (error) {
        const errorObject = JSON.parse(error.message);
        errorResponse(response, errorObject.body);
      }

      break;
    case 'payments':
      break;

    case 'orders':
      break;

    default:
      break;
  }
};

module.exports = { post };
