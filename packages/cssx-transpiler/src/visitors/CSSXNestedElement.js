var CSSXElement = require('./CSSXElement');
var formCSSXElement = CSSXElement.formCSSXElement;
var t = require('babel-types');
var injectAt = require('../helpers/injectAt');
var isArray = require('../helpers/isArray');
var settings = require('../settings');
var getID = require('../helpers/randomId');

module.exports = {
  enter: function (node, parent, index, context) {},
  exit: function (node, parent, index, context) {
    var id = getID(), tempArrId = getID(), lines = [];
    var pure = context.inCallExpression || context.inReturnStatement; // no CSSX lib involved

    if (!pure) {
      lines.push(t.variableDeclaration(
        'var',
        [
          t.variableDeclarator(
            t.identifier(id),
            formCSSXElement([ t.stringLiteral(node.query) ])
          )
        ]
      ));
      lines = lines.concat(node.body.map(function (cssxElementNode) {
        cssxElementNode.callee.object.name = id;
        cssxElementNode.callee.property.name = settings.CSSXClientNestedMethodName;
        return t.expressionStatement(cssxElementNode);
      }));
    } else {
      lines.push(t.variableDeclaration(
        'var', [
          t.variableDeclarator(
            t.identifier(id),
            t.objectExpression([])
          ),
          t.variableDeclarator(
            t.identifier(tempArrId),
            t.arrayExpression()
          )

        ]
      ));
      lines.push(t.expressionStatement(
        t.assignmentExpression(
          '=',
          t.memberExpression(
            t.identifier(id),
            t.stringLiteral(node.query),
            true
          ),
          t.identifier(tempArrId)
        )
      ));
      lines = lines.concat(node.body.map(function (cssxElementNode) {
        if (!pure) {
          cssxElementNode.callee.object.name = id;
          cssxElementNode.callee.property.name = settings.CSSXClientNestedMethodName;
          return t.expressionStatement(cssxElementNode);
        }
        cssxElementNode.callee = t.memberExpression(
          t.identifier(tempArrId),
          t.identifier('push')
        );
        cssxElementNode.callee.property.name = 'push';
        return t.expressionStatement(cssxElementNode);
      }));
    }

    if (pure) {
      lines.push(t.callExpression(
        t.memberExpression(t.identifier(settings.CSSXCalleeObj), t.identifier('push')),
        [t.identifier(id)]
      ));
    }

    if (isArray(parent)) {
      injectAt(parent, index, lines);
    } else {
      delete parent[index];
    }
  }
};
