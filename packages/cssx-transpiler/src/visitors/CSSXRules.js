var t = require('babel-types');
var randomId = require('../helpers/randomId');

module.exports = {
  enter: function (node, parent, index, context) {},
  exit: function (node, parent, index, context) {
    var propAssignment, propsObject, addToContext;
    var rules = node.body;
    var id = randomId();

    addToContext = function (item) {
      if (context && context.addToCSSXSelfInvoke) {
        context.addToCSSXSelfInvoke(item);
      }
    };

    propsObject = t.variableDeclaration(
      'var',
      [
        t.variableDeclarator(
          t.identifier(id),
          t.objectExpression([])
        )
      ]
    );
    rules.forEach(function (rule) {
      propAssignment = t.expressionStatement(
        t.assignmentExpression(
          '=',
          t.memberExpression(
            t.identifier(id),
            rule.key,
            true
          ),
          rule.value
        )
      );
      addToContext(propAssignment);
    });
    addToContext(propsObject);

    parent[index] = t.identifier(id);
  }
};
