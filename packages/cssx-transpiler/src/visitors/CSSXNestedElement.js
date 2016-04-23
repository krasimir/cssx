var t = require('babel-types');
var injectAt = require('../helpers/injectAt');
var isArray = require('../helpers/isArray');
var getID = require('../helpers/randomId');

module.exports = {
  enter: function (node, parent, index, context) {},
  exit: function (node, parent, index, context) {
    var id = getID(), tempArrId = getID(), lines = [];

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
      cssxElementNode.callee = t.memberExpression(
        t.identifier(tempArrId),
        t.identifier('push')
      );
      cssxElementNode.callee.property.name = 'push';
      return t.expressionStatement(cssxElementNode);
    }));

    lines.push(t.callExpression(
      t.memberExpression(t.identifier('cssx'), t.identifier('push')),
      [t.identifier(id)]
    ));

    if (isArray(parent)) {
      injectAt(parent, index, lines);
    } else {
      delete parent[index];
    }
  }
};
