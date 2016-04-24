var t = require('babel-types');
var injectAt = require('../helpers/injectAt');
var isArray = require('../helpers/isArray');
var getID = require('../helpers/randomId');
var parseExpressions = require('../core/parseExpressions');

module.exports = {
  enter: function (node, parent, index, context) {},
  exit: function (node, parent, index, context) {
    var id = getID(), tempArrId = getID(), lines = [];
    var options = this.options;
    var variables = [];

    if (options.format !== 'object') {
      variables.push(t.variableDeclarator(
        t.identifier(id),
        t.objectExpression([])
      ));
    }

    variables.push(t.variableDeclarator(
      t.identifier(tempArrId),
      options.format === 'object' ? t.objectExpression([]) : t.arrayExpression()
    ));

    lines.push(t.variableDeclaration('var', variables));
    lines.push(t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.identifier(options.format === 'object' ? 'cssx' : id),
          parseExpressions(node),
          true
        ),
        t.identifier(tempArrId)
      )
    ));
    lines = lines.concat(node.body.map(function (cssxElementNode) {
      if (options.format === 'object') {
        cssxElementNode.expression.left.object.name = tempArrId;
        return cssxElementNode;
      }
      cssxElementNode.callee = t.memberExpression(
        t.identifier(tempArrId),
        t.identifier('push')
      );
      cssxElementNode.callee.property.name = 'push';
      return t.expressionStatement(cssxElementNode);
    }));

    if (options.format !== 'object') {
      lines.push(t.callExpression(
        t.memberExpression(t.identifier('cssx'), t.identifier('push')),
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
