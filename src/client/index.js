var factory = require('./CSSFactory');

var stylesheets = [];
var api = function () {};

api.domChanges = function (flag) {
  factory.disableDOMChanges = !flag;
};
api.minify = function (flag) {
  factory.minify = flag;
};
api.getStylesheets = function () {
  return stylesheets;
};
api.clear = function () {
  var i;

  for (i = 0; i < stylesheets.length; i++) {
    stylesheets[i].clear();
  }
  stylesheets = [];
};

api.stylesheet = api.s = createStyleSheet;
module.exports = api;

// helpers

function createStyleSheet () {
  var s = factory.apply(factory, arguments);

  stylesheets.push(s);
  return s;
};