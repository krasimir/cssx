var t = require('babel-types');

var formCSSXElement = function (args, options) {
  if (options.format === 'object') {
    return t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.identifier('cssx'),
          t.stringLiteral(args[0].value),
          true
        ),
        args[1]
      )
    );
  }
  return t.callExpression(
    t.memberExpression(
      t.identifier('cssx'),
      t.identifier('push')
    ),
    [t.arrayExpression(args)]
  );
};

var formCSSXSheetDefinition = function (selectorNode, options) {
  return t.callExpression(
    t.identifier('cssx'),
    selectorNode ? [ t.identifier(selectorNode.value) ] : []
  );
};

module.exports = {
  enter: function (node, parent, index, context) {},
  exit: function (node, parent, index, context) {
    var args = [], el;

    node.selector ? args.push(node.selector) : null;

    if (node.body) {
      args.push(node.body);
      el = formCSSXElement(args, this.options);
    } else {
      el = formCSSXSheetDefinition(node.selector, this.options);
    }

    if (typeof parent !== 'undefined' && index !== 'undefined') {
      parent[index] = el;
    }
    return el;
  }
};
module.exports.formCSSXElement = formCSSXElement;
