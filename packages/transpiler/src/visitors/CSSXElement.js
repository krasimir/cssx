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

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    var args = [], el;

    node.selector ? args.push(node.selector) : null;
    node.body ? args.push(node.body) : null;
    el = formCSSXElement(args);

    if (typeof parent !== 'undefined' && index !== 'undefined') {
      parent[index] = el;
    }
    return el;
  }
};
module.exports.formCSSXElement = formCSSXElement;
