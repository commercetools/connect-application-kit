import updateCart from '../json/updateCart.json';

export const JSONDeserializer = (
  type: string,
  body?: string
): Object | null => {
  switch (type) {
    case 'fromFile':
      return updateCart;

    case 'fromBody':
      if (body) {
        return JSON.parse(body);
      }
  }
  return null;
};
