var t = require('babel-types');
var settings = require('../settings');

var formCSSXElement = function (args, pure) {
  if (!pure) {
    return t.callExpression(
      t.MemberExpression(
        t.identifier(settings.CSSXCalleeObj),
        t.identifier(settings.CSSXCalleeProp)
      ),
      args
    );
  }
  return t.callExpression(
    t.memberExpression(
      t.identifier(settings.CSSXCalleeObj),
      t.identifier('push')
    ),
    [t.arrayExpression(args)]
  );
};

var formCSSXSheetDefinition = function (selectorNode, pure) {
  return t.callExpression(
    t.identifier(settings.CSSXCalleeObj),
    selectorNode ? [ t.identifier(selectorNode.value) ] : []
  );
};

module.exports = {
  enter: function (node, parent, index, context) {},
  exit: function (node, parent, index, context) {
    var args = [], el;
    var pure = context.inCallExpression || context.inReturnStatement; // no CSSX lib involved

    node.selector ? args.push(node.selector) : null;

    if (node.body) {
      args.push(node.body);
      el = formCSSXElement(args, pure);
    } else {
      el = formCSSXSheetDefinition(node.selector, pure);
    }

    if (typeof parent !== 'undefined' && index !== 'undefined') {
      parent[index] = el;
    }
    return el;
  }
};
module.exports.formCSSXElement = formCSSXElement;
