import { Request, Response } from 'express';
import { errorResponse, sucessResponse } from '../utils/response.utils';
import { cartController } from './cart.controller';

export const post = async (request: Request, response: Response) => {
  // Deserialize the action and resouce from the body
  const { action, resource } = request.body;

  // Identify the type of resource in order to redirect
  // to the correct controller
  switch (resource.typeId) {
    case 'cart':
      try {
        const data = await cartController(action, resource);

        if (data!.statusCode === 200) {
          return sucessResponse(response, data!.statusCode, data!.actions);
        }

        return errorResponse(response, data!);
      } catch (error) {
        if (error instanceof Error) {
          const errorObject = JSON.parse(error.message);
          errorResponse(response, errorObject.body);
        }
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
