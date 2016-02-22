var randomId = require('../helpers/randomId');

module.exports = {
  enter: function (node, parent, index, context) {
    if (node.arguments.length === 1 && node.arguments[0].type === 'CSSXDefinition') {
      node.__id = context.nodeId = randomId();
      context.inCallExpression = true;
    }
  },
  exit: function (node, parent, index, context) {
    if (context.nodeId === node.__id) {
      context.inCallExpression = false;
      delete context.nodeId;
      delete node.__id;
    }
  }
};
