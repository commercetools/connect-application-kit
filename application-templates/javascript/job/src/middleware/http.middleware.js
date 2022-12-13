/**
 * Configure Middleware. Example only. Adapt on your own
 */
const createHttpMiddlewareOptions = (region) => ({
  host: `https://api.${region}.commercetools.com`,
});

module.exports = { createHttpMiddlewareOptions };
