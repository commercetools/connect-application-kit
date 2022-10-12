import { Request, Response } from 'express';
import { cartController } from './cart.controller';

export const post = (request: Request, response: Response) => {
  // Deserialize the action and resouce from the body
  const { action, resource } = request.body;

  console.log('PROJECT KEY : ', process.env.PROJECT_KEY);

  switch (resource.typeId) {
    case 'cart':
      console.log('CART RESOURCE');
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
