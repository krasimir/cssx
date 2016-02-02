var isArray = require('../helpers/isArray');
var injectAt = require('../helpers/injectAt');
var getID = require('../helpers/randomId');
var t = require('babel-types');
var settings = require('../settings');
var isIgnored = require('../core/traverse').isIgnored;

var updateStyleSheet = function (node, stylesheetId) {
  var key, i;

  if (
    node && node.type === 'CallExpression' &&
    node.callee && node.callee.type === 'MemberExpression' &&
    node.callee.object && node.callee.object.name === 'cssx'
  ) {
    node.callee.object.name = stylesheetId;
  } else {
    if (isArray(node)) {
      for (i = 0; i < node.length; i++) {
        updateStyleSheet(node[i], stylesheetId);
      }
    } else {
      for (key in node) {
        if (!isIgnored(key)) {
          if (typeof node[key] === 'object') {
            updateStyleSheet(node[key], stylesheetId);
          }
        }
      }
    }
  }
  return node;
};

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    var funcLines = [], stylesheetId = getID(), funcBody, funcExpr, selfInvoke;

    funcLines.push(t.variableDeclaration(
      'var',
      [
        t.variableDeclarator(
          t.identifier(stylesheetId),
          t.callExpression(
            t.MemberExpression(
              t.identifier(settings.CSSXCalleeObj),
              t.identifier(settings.CSSXNewStylesheet)
            ),
            [t.stringLiteral(stylesheetId)]
          )
        )
      ]
    ));
    funcLines = funcLines.concat(node.body.map(function (line) {
      line = updateStyleSheet(line, stylesheetId);
      if (line.type === 'CallExpression') {
        line = t.expressionStatement(updateStyleSheet(line, stylesheetId));
      }
      return line;
    }));
    funcLines.push(t.returnStatement(t.identifier(stylesheetId)));

    funcBody = t.blockStatement(funcLines);
    funcExpr = t.callExpression(
      t.memberExpression(
        t.functionExpression(null, [], funcBody),
        t.identifier('apply')
      ),
      [t.thisExpression()]
    );
    selfInvoke = t.expressionStatement(funcExpr);

    if (node.body.length === 0) {
      delete parent[index];
    } else {
      if (isArray(parent)) {
        injectAt(parent, index, selfInvoke);
      } else {
        parent[index] = selfInvoke;
      }
    }
  }
};
