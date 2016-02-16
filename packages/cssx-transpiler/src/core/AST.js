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

module.exports = function (code, opts) {
  if (!opts) opts = {};
  return babylon.parse(code, {
    plugins: BABYLON_PLUGINS,
    sourceType: opts.sourceType || 'module'
  });
};
