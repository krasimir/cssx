var randomId = require('../helpers/randomId');

module.exports = {
  enter: function (node, parent, index, context) {
    if (node.argument && node.argument.type === 'CSSXDefinition') {
      node.__id = context.nodeId = randomId();
      context.inReturnStatement = true;
    }
  },
  exit: function (node, parent, index, context) {
    if (context.nodeId === node.__id) {
      context.inReturnStatement = false;
      delete context.nodeId;
      delete node.__id;
    }
  }
};
