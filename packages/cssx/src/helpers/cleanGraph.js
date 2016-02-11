module.exports = function (stylesheet) {
  var graph = stylesheet.graph();
  (function clean(g) {
    if (g.__rule) delete g.__rule;
    for (var i in g) {
      clean(g[i]);
    }
  })(graph);
  return graph;
};