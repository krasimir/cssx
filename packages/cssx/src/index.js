var factory, goGlobal, stylesheets, api;

require('./polyfills');

factory = require('./CSSStylesheet');
goGlobal = require('./helpers/goGlobal');

stylesheets = [];
api = function () {};

function createStyleSheet(id) {
  var s, i;

  if (typeof id === 'undefined') {
    throw new Error('`stylesheet` method expects ID as an argument');
  }

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

goGlobal(module.exports);
