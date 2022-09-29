import { Request, Response } from 'express';

export const get = (request: Request, response: Response) => {
  response.json([{
    id: 1,
    name: 'Order 1',
  }, {
    id: 2,
    name: 'Order 2',
  }]);
};
