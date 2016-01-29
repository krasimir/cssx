var t = require('babel-types');

var CSSXCalleeObj = 'cssx';
var CSSXCalleeProp = 'add';
var formCSSXElement = function (args) {
  return t.callExpression(
    t.MemberExpression(
      t.identifier(CSSXCalleeObj),
      t.identifier(CSSXCalleeProp)
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
