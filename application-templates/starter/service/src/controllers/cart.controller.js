const { apiRoot } = require('../client/create.client');

/**
 * Handle the create action
 *
 * @param resource The resource from the request body
 * @returns {object}
 */
const create = async (resource) => {
  try {
    let updateActions = [];

    // Deserialize the resource to a CartDraft
    const cartDraft = JSON.parse(JSON.stringify(resource));

    // Fetch the cart with the ID
    // eslint-disable-next-line no-unused-vars
    const cart = await apiRoot
      .carts()
      .withId({ ID: cartDraft.id })
      .get()
      .execute();

    // Work with the cart

    // Create the UpdateActions Object to return it to the client
    const updateAction = {
      action: 'recalculate',
      updateProductData: false,
    };

    updateActions.push(updateAction);

    return { statusCode: 200, actions: updateActions };
  } catch (error) {
    // Retry or handle the error
    // Create an error object

    throw new Error(JSON.stringify(error));
  }
};

// Controller for update actions
// eslint-disable-next-line no-unused-vars
const update = (resource) => {};

/**
 * Handle the cart controller according to the action
 *
 * @param action The action that comes with the request. Could be `Create` or `Update`
 * @param resource The resource from the request body
 * @returns {Promise<object>} The data from the method that handles the action
 */
const cartController = async (action, resource) => {
  switch (action) {
    case 'Create':
      const data = create(resource);
      return data;
    case 'Update':
      break;
    default:
      break;
  }
};

module.exports = { cartController };
