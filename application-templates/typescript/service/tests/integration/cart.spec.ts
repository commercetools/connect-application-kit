import { describe, expect } from '@jest/globals';
import { cartController } from '../../src/controllers/cart.controller';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { createApiRoot } from '../../src/client/create.client';

jest.mock('../../src/client/create.client', () => {
  const mockCreateApiRoot = jest.fn();
  return {
    createApiRoot: mockCreateApiRoot,
  };
});

const cartId = '643cf548-e12e-4f17-bc7d-c826ecbc35b2';
const productId = 'fc75c80a-35bb-4414-92b1-d7899534b6f2';

const lineItem: LineItem = {
  id: '5f409894-85eb-498e-b44e-4f8155d3619a',
  productId: 'fc75c80a-35bb-4414-92b1-d7899534b6f2',
  productKey: 'ben-pillow-cover',
  name: {
    'en-US': 'Ben Pillow Cover',
  },
  productType: {
    typeId: 'product-type',
    id: 'fc4487a6-65cb-4433-916a-f669e094e4d8',
  },
  productSlug: {
    'en-US': 'ben-pillow-cover',
  },
  variant: {
    id: 1,
    sku: 'LBPC-09',
    key: 'LBPC-09',
  },
  price: {
    id: 'a1ba8634-68cc-4e68-b318-2284f111bb3d',
    value: {
      type: 'centPrecision',
      currencyCode: 'EUR',
      centAmount: 1039,
      fractionDigits: 2,
    },
    key: 'ben-pillow-cover-LBPC-09-FR-EUR',
    country: 'FR',
  },
  quantity: 1,
  discountedPricePerQuantity: [],
  perMethodTaxRate: [],
  addedAt: '2023-12-18T18:07:29.685Z',
  lastModifiedAt: '2023-12-18T18:07:29.685Z',
  state: [],
  priceMode: 'Platform',
  lineItemMode: 'Standard',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 1039,
    fractionDigits: 2,
  },
  taxedPricePortions: [],
};

const cart: Cart = {
  id: cartId,
  version: 1,
  createdAt: '',
  lastModifiedAt: '',
  anonymousId: 'e9e59e5b-6e88-414d-9797-d1a08411db12',
  locale: 'de-DE',
  lineItems: [lineItem],
  cartState: 'Active',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 0,
    fractionDigits: 2,
  },
  country: 'DE',
  shippingMode: 'Single',
  shipping: [],
  customLineItems: [],
  discountCodes: [],
  directDiscounts: [],
  inventoryMode: 'ReserveOnOrder',
  taxMode: 'Platform',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  refusedGifts: [],
  origin: 'Customer',
  itemShippingAddresses: [],
};

describe('Testing Event Controller', () => {
  it('Cart Created (Mocked)', async () => {
    // Define a mock root to be returned
    const withId = jest.fn().mockReturnValueOnce({
      get: jest.fn().mockReturnValueOnce({
        execute: jest.fn().mockReturnValueOnce(lineItem),
      }),
    });
    const mockRoot = {
      products: jest.fn().mockReturnValueOnce({
        withId: withId,
      }),
    };

    // Set the mock implementation for createApiRoot to return mockRoot
    (createApiRoot as jest.Mock).mockReturnValueOnce(mockRoot);

    const response = await cartController('Create', {
      ...cart,
      lineItems: [lineItem],
    });

    expect(response?.statusCode).toBe(200);
    expect(withId).toHaveBeenCalledWith({ ID: productId });
  });
  /*
   * This Test really calls the commercetools APIs. To do so,
   * - remove the mocking code in line 7-12
   * - configure a "real" cartId
   * - remove the skip below
   *
   * The code below comes in handy to test during development.
   */
  it.skip('Cart Created', async () => {
    const response = await cartController('Create', cart);
    expect(response?.statusCode).toBe(200);
    expect(response?.actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: 'recalculate',
          updateProductData: false,
        }),
      ])
    );
  });
});
