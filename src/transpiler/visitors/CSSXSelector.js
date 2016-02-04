var t = require('babel-types');
var parseExpressions = require('../core/expressions');

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    if (node.expressions) {
      parent[index] = parseExpressions(node);
    } else {
      parent[index] = t.stringLiteral(node.value);
    }
  }
};
