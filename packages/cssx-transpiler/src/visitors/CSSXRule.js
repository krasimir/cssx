var t = require('babel-types');

var isNumeric = function (num) {
  return !isNaN(num);
};

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    if (isNumeric(node.body.value)) {
      parent[index] = { key: node.label, value: t.numericLiteral(Number(node.body.value)) };
    } else {
      parent[index] = { key: node.label, value: node.body };
    }
  }
};
