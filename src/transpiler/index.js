var babylon = require('./vendor/babylon');

module.exports = function (code) {
  return 'a';
};

module.exports.ast = function (code) {
  var BABYLON_PLUGINS = [
    'jsx',
    'cssx',
    'flow',
    'asyncFunctions',
    'classConstructorCall',
    'doExpressions',
    'trailingFunctionCommas',
    'objectRestSpread',
    'decorators',
    'classProperties',
    'exportExtensions',
    'exponentiationOperator',
    'asyncGenerators',
    'functionBind',
    'functionSent'
  ];
  return babylon.parse(code, {
    plugins: BABYLON_PLUGINS
  });
};
