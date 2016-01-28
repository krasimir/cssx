module.exports = function extend(target, source) {
  var prop;

  target = target || {};
  for (prop in source) {
    if (typeof source[prop] === 'object') {
      target[prop] = extend(target[prop], source[prop]);
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
};
