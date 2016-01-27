var AST = require('./core/AST');
var traverse = require('./core/traverse');
var generate = require('babel-generator').default;

var visitors = {
  CSSXDefinition: require('./visitors/CSSXDefinition'),
  CSSXRules: require('./visitors/CSSXRules')
};

module.exports = function (code) {
  var ast = AST(code);

  traverse(ast.program, visitors);
  return generate(ast).code;
};

module.exports.ast = AST;
