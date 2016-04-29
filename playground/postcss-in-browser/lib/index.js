var cssx = require('cssx');
var postcssJs = require('postcss-js');
var colorGrey = require('postcss-color-gray');
var postcssPlugins = postcssJs.sync([colorGrey]);

var plugin = function (styles) {
  return postcssPlugins(styles);
};

cssx.minify(false);
cssx.plugins([plugin]);

var sheet = cssx();
sheet.add((function () {
  var _2 = {},
      _3 = {};
  _3['color'] = 'gray(85)';
  _2['body'] = _3;
  return _2;
}.apply(this)));