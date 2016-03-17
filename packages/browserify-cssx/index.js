var through = require('through2');
var cssxTranspiler = require('cssx-transpiler');

module.exports = function (file) {
  return through(function (buf, enc, next) {
    this.push(cssxTranspiler(buf.toString('utf8'), { minified: false }));
    next();
  });
};