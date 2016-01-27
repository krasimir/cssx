module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    delete parent[index];
  }
};
