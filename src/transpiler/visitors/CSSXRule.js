module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    parent[index] = { key: node.label, value: node.body };
  }
};
