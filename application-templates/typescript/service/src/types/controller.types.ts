import { UpdateAction } from '@commercetools/sdk-client-v2';

export type ControllerResult =
  | { statusCode: number; actions: Array<UpdateAction> }
  | undefined;
