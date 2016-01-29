var cache = {};

require('setimmediate');

module.exports = function (work, id) {
  if (!cache[id]) {
    cache[id] = work;
    setImmediate(function () {
      delete cache[id];
      work();
    });
  }
};
