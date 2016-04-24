var through = require('through2');
var cssxTranspiler = require('cssx-transpiler');

module.exports = function (file, options) {
  var cssxOptions = options && options._flags && options._flags.cssx ? options._flags.cssx : {
    minified: false
  };
  return through(function (buf, enc, next) {
    this.push(cssxTranspiler(buf.toString('utf8'), cssxOptions));
    next();
  });
};