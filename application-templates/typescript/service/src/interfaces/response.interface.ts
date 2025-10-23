import { CartUpdateAction } from '@commercetools/platform-sdk';

export interface ResponseInterfaceSuccess {
  actions: Array<CartUpdateAction>;
}

export interface ResponseInterfaceError {
  errors: Array<unknown>;
}
