import { ctpClient } from './build.client';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.PROJECT_KEY!,
});

export const getProject = async () => {
  return await apiRoot.get().execute();
};
