module.exports = function (v) {
  return Object.prototype.toString.call(v) === '[object Array]';
};
