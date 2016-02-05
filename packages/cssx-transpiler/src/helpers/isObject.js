var isArray = require('./isArray');

module.exports = function (item) {
  return (typeof item === 'object' && !isArray(item) && item !== null);
};
