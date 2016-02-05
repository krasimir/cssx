module.exports = function (selector) {
  return typeof selector === 'function' ? selector() : selector;
};
