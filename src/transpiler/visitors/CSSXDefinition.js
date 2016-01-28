module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    parent.splice.apply(parent, [index, 1].concat(node.body));
  }
};
