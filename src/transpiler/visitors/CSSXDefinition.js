var isArray = require('../helpers/isArray');
var injectAt = require('../helpers/injectAt');

module.exports = {
  enter: function (node, parent, index) {},
  exit: function (node, parent, index) {
    if (node.body.length === 0) {
      delete parent[index];
    } else {
      if (isArray(parent)) {
        injectAt(parent, index, node.body);
      } else {
        parent[index] = node.body[0];
      }
    }
  }
};
