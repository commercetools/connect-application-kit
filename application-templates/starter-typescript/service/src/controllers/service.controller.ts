import { Request, Response } from 'express';
import { apiError } from '../api/error.api';
import { apiSuccess } from '../api/success.api';
import { cartController } from './cart.controller';

/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (request: Request, response: Response) => {
  // Deserialize the action and resouce from the body
  const { action, resource } = request.body;

  if (!action || !resource) {
    apiError(400, 'Bad request - Missing body parameters.', response);
  }

  // Identify the type of resource in order to redirect
  // to the correct controller
  switch (resource.typeId) {
    case 'cart':
      try {
        const data = await cartController(action, resource);

        if (data && data.statusCode === 200) {
          apiSuccess(200, data.actions, response);
          return;
        }

        apiError(data?.statusCode as number, JSON.stringify(data), response);
        return;
      } catch (error) {
        if (error instanceof Error) {
          apiError(500, error.message, response);
        }
      }

      break;
    case 'payments':
      break;

    case 'orders':
      break;

    default:
      apiError(
        500,
        `Internal Server Error - Resource not recognized. Allowed values are 'cart', 'payments' or 'orders'.`,
        response
      );
  }
};
