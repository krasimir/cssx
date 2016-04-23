var t = require('babel-types');

var formCSSXElement = function (args, pure) {
  return t.callExpression(
    t.memberExpression(
      t.identifier('cssx'),
      t.identifier('push')
    ),
    [t.arrayExpression(args)]
  );
};

var formCSSXSheetDefinition = function (selectorNode, pure) {
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
      el = formCSSXElement(args);
    } else {
      el = formCSSXSheetDefinition(node.selector);
    }

    if (typeof parent !== 'undefined' && index !== 'undefined') {
      parent[index] = el;
    }
    return el;
  }
};
module.exports.formCSSXElement = formCSSXElement;
