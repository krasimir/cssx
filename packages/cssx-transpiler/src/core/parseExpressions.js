var t = require('babel-types');
var AST = require('./AST');

module.exports = function (node) {
  var value = node.value || node.name || node.query;
  var expressions = node.expressions || [];
  var bit, replaceWith, ast, mutations, i = -1, starts, ends, index, inExpr = false, ch;
  var length = value.length;
  var code = '';

  mutations = expressions.map(function (expr) {
    bit = value.substr(expr.contextLoc.start, expr.contextLoc.end - expr.contextLoc.start);
    replaceWith = '(' + bit.replace(/^(`|{{|<%)([\s\S]+)(`|}}|%>)$/mg, '$2') + ')';

    return {
      start: expr.contextLoc.start,
      end: expr.contextLoc.end,
      replaceWith: replaceWith
    };
  });
  starts = mutations.map(function (m) { return m.start; });
  ends = mutations.map(function (m) { return m.end; });

  while (++i < length) {
    // start
    if ((index = starts.indexOf(i)) >= 0) {
      code += (i === 0 ? '' : '" + ') + mutations[index].replaceWith;
      inExpr = true;
    // ends
    } else if ((index = ends.indexOf(i)) >= 0) {
      code += i === length ? '' : ' + "';
      inExpr = false;
    }

    if (!inExpr) {
      ch = value.charAt(i);
      ch = ch === '"' ? '\\"' : ch;
      if (i === 0) {
        code += '"' + ch;
      } else if (i === length - 1) {
        code += ch + '"';
      } else {
        code += ch;
      }
    }
  }

  try {
    ast = AST(code);
  } catch (err) {
    throw new Error('parsing cssx expression: ' + code + ' (' + err.message + ')');
  }

  if (ast && ast.program && ast.program.body && ast.program.body[0] && ast.program.body[0].expression) {
    return ast.program.body[0].expression;
  }
  return t.stringLiteral(value);
};
