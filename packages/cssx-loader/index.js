var cssxTranspiler = require('cssx-transpiler');

module.exports = function(code) {
  var CSSXTranspilerOptions = this.options && this.options.cssx ? this.options.cssx : { minify: false };
  this.cacheable && this.cacheable();
  return cssxTranspiler(code, CSSXTranspilerOptions);
};
