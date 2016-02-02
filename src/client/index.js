var factory = require('./CSSFactory');

var stylesheets = [];
var api = function () {};

function createStyleSheet(id) {
  var s, i;

  for (i = 0; i < stylesheets.length; i++) {
    if (stylesheets[i].id() === id) {
      return stylesheets[i];
    }
  }
  s = factory.apply(factory, arguments);
  stylesheets.push(s);
  return s;
};

api.domChanges = function (flag) {
  factory.disableDOMChanges = !flag;
};
api.minify = function (flag) {
  factory.minify = flag;
};
api.nextTick = function (flag) {
  factory.useNextTick = flag;
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
  return api;
};
api.getCSS = function () {
  var i, css = '';

  for (i = 0; i < stylesheets.length; i++) {
    css += stylesheets[i].getCSS();
  }
  return css;
};

api.stylesheet = api.s = createStyleSheet;
module.exports = api;
