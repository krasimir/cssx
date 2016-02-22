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

var funcLines, objectLiterals, stylesheetId;

module.exports = {
  enter: function (node, parent, index, context) {
    funcLines = [];
    objectLiterals = [];
    stylesheetId = getID();
    context.addToCSSXSelfInvoke = function (item, parent) {
      funcLines = [item].concat(funcLines);
      if (item.type === 'VariableDeclaration' && context.inCallExpression) {
        objectLiterals.push({
          selector: parent.selector.value ? t.stringLiteral(parent.selector.value) : parent.selector,
          rulesObjVar: item.declarations[0].id.name
        });
      }
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
            t.identifier(settings.CSSXCalleeObj),
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

    // styles passed to a method
    if (context.inCallExpression) {
      funcLines.push(
        t.returnStatement(
          t.arrayExpression(objectLiterals.map(function (o) {
            return t.arrayExpression([o.selector, t.identifier(o.rulesObjVar)]);
          }))
        )
      );
    // styles for only one rule
    } else if (objectLiterals.length === 1 && objectLiterals[0].selector === '') {
      funcLines.push(t.returnStatement(t.identifier(objectLiterals[0].rulesObjVar)));
    // autocreating a stylesheet
    } else {
      funcLines.push(newStylesheetExpr);
      funcLines = funcLines.concat(rulesRegistration);
      funcLines.push(t.returnStatement(t.identifier(stylesheetId)));
    }

    createSelfInvoke = function (expr) { return t.parenthesizedExpression(expr); };

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
