export default {
  '[["sort","id desc"],["sort","sort"],["where","where"]]': {
    count: 3,
    total: 5,
    results: [{ id: '5' }, { id: '4' }, { id: '3' }],
  },
  '[["sort","id desc"],["sort","sort"],["where","id < \\"3\\" and (where)"]]': {
    count: 2,
    total: 2,
    results: [{ id: '2' }, { id: '1' }],
  },
  '[["sort","id desc"],["sort","sort"],["where","empty"]]': {
    count: 0,
    total: 0,
    results: [],
  },
};
