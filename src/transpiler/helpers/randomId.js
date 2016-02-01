var ids = 0;

module.exports = function () {
  return '_' + (++ids);
};
module.exports.resetIDs = function () {
  ids = 0;
};
