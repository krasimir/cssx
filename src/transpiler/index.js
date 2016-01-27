var AST = require('./core/AST');
var traverse = require('./core/traverse');
var generate = require('babel-generator').default;

var visitors = {
  CSSXDefinition: require('./visitors/CSSXDefinition')
};

module.exports = function (code) {
  var ast = AST(code);

  traverse(ast.program, visitors);
  // console.log(generate);
};

module.exports.ast = AST;
