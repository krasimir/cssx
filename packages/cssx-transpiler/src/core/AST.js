var babylon = require('../vendor/babylon');
var cssxPlugin = require('babylon-plugin-cssx');

var BABYLON_PLUGINS = [
  'jsx',
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
  'functionSent',
  cssxPlugin
];

module.exports = function (code, opts) {
  if (!opts) opts = {};
  return babylon.parse(code, {
    plugins: BABYLON_PLUGINS,
    sourceType: opts.sourceType || 'module'
  });
};
