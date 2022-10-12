import { ctpClient } from './build.client';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { projectKey } from '../utils/options.utils';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKey,
});

export const getProject = () => {
  return apiRoot.get().execute();
};
