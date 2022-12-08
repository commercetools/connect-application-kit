// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
function getAll(getFunction) {
  return async function getAll(queryArgs) {
    async function recur(
      { sort, limit = process.env.MAX_ITEMS, where },
      lastResults: object | undefined = undefined,
      results = []
    ) {
      const id = lastResults?.results?.slice(-1)[0]?.id;

      const { total, count } = lastResults || {};

      if (lastResults && total === count) {
        return {
          offset: 0,
          results,
          count: results.length,
          total: results.length,
          limit: results.length,
        };
      }

      if (id) {
        where = where ? `id < "${id}" and (${where})` : `id < "${id}"`;
      }

      sort = sort ? [`id desc`, ...sort] : 'id desc';

      return getFunction({
        sort,
        limit,
        where,
      }).then((res) => {
        return recur(queryArgs, res, results.concat(res.results));
      });
    }

    return await recur(queryArgs);
  };
}

export { getAll };
