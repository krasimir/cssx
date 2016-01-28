var t = require('babel-types');

var CSSXCalleeObj = 'cssx';
var CSSXCalleeProp = 'add';

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    var args = [];

    node.selector ? args.push(node.selector) : null;
    node.body ? args.push(node.body) : null;

    parent[index] = t.callExpression(
      t.MemberExpression(
        t.identifier(CSSXCalleeObj),
        t.identifier(CSSXCalleeProp)
      ),
      args
    );
  }
};
