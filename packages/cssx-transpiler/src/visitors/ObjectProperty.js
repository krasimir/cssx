var randomId = require('../helpers/randomId');

module.exports = {
  enter: function (node, parent, index, context) {
    if (node.type === 'ObjectProperty' && node.value.type === 'CSSXDefinition') {
      node.__id = context.nodeId = randomId();
      context.inObjectProperty = true;
    }
  },
  exit: function (node, parent, index, context) {
    if (context.nodeId === node.__id) {
      context.inObjectProperty = false;
      delete context.nodeId;
      delete node.__id;
    }
  }
};
