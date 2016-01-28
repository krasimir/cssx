var t = require('babel-types');
var CSSXCallee = 'cssx';

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    var args = [];

    node.selector ? args.push(node.selector) : null;
    node.body ? args.push(node.body) : null;
    parent[index] = t.callExpression(t.identifier(CSSXCallee), args);
  }
};
