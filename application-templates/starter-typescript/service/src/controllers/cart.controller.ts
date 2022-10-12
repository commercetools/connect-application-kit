import { CartDraft } from '@commercetools/platform-sdk';

import { apiRoot } from '../client/create.client';
import { Resourse } from '../interfaces/resource.interface';

const get = () => {
  return apiRoot.carts().get();
};

const post = (resource: Resourse) => {
  // Deserialize the resource to a CartDraft

  try {
    const cartDraft: CartDraft = JSON.parse(JSON.stringify(resource));

    console.log('CART DRAFT');
    console.log(cartDraft);
    return apiRoot.carts().post({ body: cartDraft }).execute();
  } catch (error) {
    console.log(error);
  }
};

export const cartController = (action: string, resource: Resourse) => {
  let data;
  switch (action) {
    case 'Get':
      data = get();
      return data;
    case 'Create':
      data = post(resource);
      return data;
  }
};
