import { CartDraft } from '@commercetools/platform-sdk';

import { apiRoot } from '../client/create.client';
import { Resourse } from '../interfaces/resource.interface';

const get = () => {
  const response = apiRoot.carts().get().execute();
  return;
};

const post = (resource: Resourse) => {
  // Deserialize the resource to a CartDraft

  try {
    const cartDraft: CartDraft = JSON.parse(JSON.stringify(resource));

    console.log('CART DRAFT');
    console.log(cartDraft);
    const response = apiRoot.carts().post({ body: cartDraft }).execute();
    response.then(console.log);
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
      console.log('CREATE SWITCH');
      data = post(resource);
      return data;
  }
};
