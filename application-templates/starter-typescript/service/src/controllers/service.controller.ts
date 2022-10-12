import { Request, Response } from 'express';
import { cartController } from './cart.controller';

export const post = (request: Request, response: Response) => {
  // Deserialize the action and resouce from the body
  const { action, resource } = request.body;

  switch (resource.typeId) {
    case 'cart':
      const data = cartController(action, resource);
      console.log('DATA');
      console.log(data);
      break;

    case 'payments':
      break;

    case 'orders':
      break;

    default:
      break;
  }
};
