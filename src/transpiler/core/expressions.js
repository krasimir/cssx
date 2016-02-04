var t = require('babel-types');
var AST = require('./AST');

module.exports = function (node) {
  var value = node.value;
  var expressions = node.expressions;
  var code = value;
  var bit, atBeginning, atTheEnd, theWhole, replaceWith, ast;

  expressions.forEach(function (expr) {
    bit = value.substr(expr.contextLoc.start, expr.contextLoc.end - expr.contextLoc.start);
    atBeginning = expr.contextLoc.start === 0;
    atTheEnd = expr.contextLoc.end === value.length;
    theWhole = atBeginning && atTheEnd;
    replaceWith = '(' + bit.replace(/^`(.+)`$/, '$1') + ')';
    if (!theWhole) {
      if (atBeginning) {
        replaceWith = replaceWith + ' + "';
      } else if (atTheEnd) {
        replaceWith = '" + ' + replaceWith;
      } else {
        replaceWith = '" + ' + replaceWith + ' + "';
      }
    }
    code = code.replace(bit, replaceWith);
  });

  try {
    ast = AST(code);
  } catch (err) {
    throw new Error('parsing cssx expression: "' + code + '" Message:' + err.message);
  }

  if (ast && ast.program && ast.program.body && ast.program.body[0] && ast.program.body[0].expression) {
    return ast.program.body[0].expression;
  }
  return t.stringLiteral(value);
};
