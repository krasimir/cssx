var cssxTranspiler = require('cssx-transpiler');

module.exports = function(code) {
  this.cacheable();
  return cssxTranspiler(code);
};
