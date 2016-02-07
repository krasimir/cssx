module.exports = function (message) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(message);
  }
};
