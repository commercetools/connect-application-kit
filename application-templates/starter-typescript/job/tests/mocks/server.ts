import { setupServer } from 'msw/node';
// following import does not work due to broken esm modules in msw
//    https://github.com/mswjs/msw/issues/1201
// import { setupServer } from 'msw/node'
import { handlers } from './handlers';
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
