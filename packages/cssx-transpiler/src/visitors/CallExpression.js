module.exports = {
  enter: function (node, parent, index, context) {
    if (node.arguments.length === 1 && node.arguments[0].type === 'CSSXDefinition') {
      context.inCallExpression = true;
    }
  },
  exit: function (node, parent, index, context) {
    context.inCallExpression = false;
  }
};
