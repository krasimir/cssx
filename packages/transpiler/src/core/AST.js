var babylon = require('../vendor/babylon');

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

module.exports = function (code) {
  return babylon.parse(code, {
    plugins: BABYLON_PLUGINS
  });
};
