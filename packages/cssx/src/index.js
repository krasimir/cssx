var factory, goGlobal, stylesheets, api, randomId, plugins = [];

require('./polyfills');

factory = require('./CSSStylesheet');
goGlobal = require('./helpers/goGlobal');
randomId = require('./helpers/randomId');

stylesheets = [];

function createStyleSheet(id) {
  var s, i;

  if (typeof id === 'undefined') {
    id = randomId();
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

api = function (id) { return createStyleSheet(id, plugins); };

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
api.plugins = function (arr) {
  plugins = plugins.concat(arr);
};

module.exports = api;

goGlobal(module.exports);
