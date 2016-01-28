var t = require('babel-types');
var CSSXCallee = 'cssx';

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    parent[index] = t.callExpression(
      t.identifier(CSSXCallee),
      [
        node.selector,
        node.body
      ]
    );
  }
};
