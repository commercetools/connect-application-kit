import { UpdateAction } from '@commercetools/sdk-client-v2';

export interface ResponseInterfaceSuccess {
  actions: Array<UpdateAction>;
}

export interface ResponseInterfaceError {
  errors: Array<unknown>;
}
