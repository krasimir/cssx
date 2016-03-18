var cssx = require('cssx');
var postcssJs = require('postcss-js');
var colorGrey = require('postcss-color-gray');
var postcssPlugins = postcssJs.sync([colorGrey]);

var plugin = function (styles) {
  return postcssPlugins(styles);
};

cssx.minify(false);
cssx.plugins([plugin]);

var sheet = (function () {
  var _2 = {};
  _2['color'] = 'gray(85)';
  _2['display'] = 'flex';

  var _1 = cssx('_1');

  _1.add('body', _2);

  return _1;
}.apply(this));