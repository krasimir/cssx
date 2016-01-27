var t = require('babel-types');

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    var newNode = t.objectProperty(t.stringLiteral('a'), t.stringLiteral('b'));
    parent[index] = newNode;
  }
};
