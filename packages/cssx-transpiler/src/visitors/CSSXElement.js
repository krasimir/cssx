var t = require('babel-types');
var settings = require('../settings');

var formCSSXElement = function (args) {
  return t.callExpression(
    t.MemberExpression(
      t.identifier(settings.CSSXCalleeObj),
      t.identifier(settings.CSSXCalleeProp)
    ),
    args
  );
};

var formCSSXSheetDefinition = function (selectorNode) {
  return t.callExpression(
    t.identifier(settings.CSSXCalleeObj),
    selectorNode ? [ t.identifier(selectorNode.value) ] : []
  );
};

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
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
