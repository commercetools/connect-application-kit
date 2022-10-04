import { Request, Response } from 'express';

export const get = (request: Request, response: Response) => {
  response.json('Hello world from the Home Controller');
};
