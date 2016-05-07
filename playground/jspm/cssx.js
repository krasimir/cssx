var cssxTranspiler = require('./vendor/cssx-transpiler');

exports.translate = function (load) {
  return cssxTranspiler(load.source);
};