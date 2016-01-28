var AST = require('./core/AST');
var traverse = require('./core/traverse');
var generate = require('babel-generator').default;

var visitors = {
  CSSXDefinition: require('./visitors/CSSXDefinition'),
  CSSXElement: require('./visitors/CSSXElement'),
  CSSXProperty: require('./visitors/CSSXProperty'),
  CSSXRule: require('./visitors/CSSXRule'),
  CSSXRules: require('./visitors/CSSXRules'),
  CSSXSelector: require('./visitors/CSSXSelector'),
  CSSXValue: require('./visitors/CSSXValue')
};

module.exports = function (code) {
  var ast = AST(code);

  traverse(ast.program, visitors);
  return generate(ast).code;
};

module.exports.ast = AST;
