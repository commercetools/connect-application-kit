import { Payment } from '@commercetools/platform-sdk';
import { logger } from '../utils/logger.utils';
import { ExtensionAction } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/extension';
import CustomError from '../errors/custom.error';
import { ControllerResult } from '../types/controller.types';

/**
 * Handle the create action
 */
const create = (item: Payment): ControllerResult => {
  logger.info(`Running API Extension for Payment Update (ID: ${item.id})`);
  return;
};

/**
 * Handle the update action
 */
const update = (item: Payment): ControllerResult => {
  logger.info(`Running API Extension for Payment Update (ID: ${item.id})`);
  return;
};

/**
 * Handle the controller according to the action
 */
export const paymentController = (
  action: ExtensionAction,
  resource: Payment
) => {
  switch (action) {
    case 'Create':
      return create(resource);
    case 'Update':
      return update(resource);

    default:
      logger.error(` Action ('${action}') not recognized.`);
      throw new CustomError(
        500,
        `Internal Server Error - Resource not recognized. Allowed values are 'Create' or 'Update'.`
      );
  }
};
