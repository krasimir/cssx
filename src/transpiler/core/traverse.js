var isArray = require('../helpers/isArray');

var IGNORE = 'start,end,loc';
var UNKNOWN_NODE = 'unknown';

var isIgnored = function (key) {
  return IGNORE.indexOf(key) >= 0;
};
var getType = function (node) {
  return node && node.type ? node.type : UNKNOWN_NODE;
};

module.exports = function (tree, visitors) {

  var traverse = function (node, parent, index) {
    var key, i;
    var type = getType(node);
    var visitor = visitors[type];

    visitor && visitor.enter ? visitor.enter(node, parent, index) : null;
    if (isArray(node)) {
      for (i = 0; i < node.length; i++) {
        traverse(node[i], node, i);
      }
    } else {
      for (key in node) {
        if (!isIgnored(key)) {
          if (typeof node[key] === 'object') {
            traverse(node[key], node, key);
          }
        }
      }
    }
    visitor && visitor.exit ? visitor.exit(node, parent, index) : null;
  };

  traverse(tree, null, null);
};

module.exports.isIgnored = isIgnored;
