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

var detectCSSRulesBlock = function (nodes) {
  return nodes.length === 1 &&
    nodes[0].type === 'ExpressionStatement' &&
    nodes[0].expression.type === 'CallExpression' &&
    nodes[0].expression.arguments.length > 0 &&
    nodes[0].expression.arguments[0].value === '';
};

var funcLines, stylesheetId;

module.exports = {
  enter: function (node, parent, index, context) {
    funcLines = [];
    stylesheetId = getID();
    context.addToCSSXSelfInvoke = function (item) {
      funcLines = [item].concat(funcLines);
    };
  },
  exit: function (node, parent, index, context) {
    var rulesRegistration, newStylesheetExpr, createSelfInvoke, funcBody, funcExpr;

    delete context.addToCSSXSelfInvoke;

    if (node.body.length === 0) {
      delete parent[index];
      return;
    }

    newStylesheetExpr = t.variableDeclaration(
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
    );

    rulesRegistration = node.body.map(function (line) {
      line = updateStyleSheet(line, stylesheetId);
      if (line.type === 'CallExpression') {
        line = t.expressionStatement(updateStyleSheet(line, stylesheetId));
      }
      return line;
    });

    // is it only css rules block
    if (detectCSSRulesBlock(rulesRegistration)) {
      funcLines.push(t.returnStatement(t.identifier(
        funcLines[0].declarations[0].id.name
      )));
      createSelfInvoke = function (expr) { return expr; };
    // creating the stylesheet
    } else {
      funcLines.push(newStylesheetExpr);
      funcLines = funcLines.concat(rulesRegistration);
      funcLines.push(t.returnStatement(t.identifier(stylesheetId)));
      createSelfInvoke = function (expr) { return t.expressionStatement(expr); };
    }

    // wrapping up the self-invoke function
    funcBody = t.blockStatement(funcLines);
    funcExpr = t.callExpression(
      t.memberExpression(
        t.functionExpression(null, [], funcBody),
        t.identifier('apply')
      ),
      [t.thisExpression()]
    );

    if (isArray(parent)) {
      injectAt(parent, index, createSelfInvoke(funcExpr));
    } else {
      parent[index] = createSelfInvoke(funcExpr);
    }
  }
};
