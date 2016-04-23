var cssx = require('cssx');
var postcssJs = require('postcss-js');
var colorGrey = require('postcss-color-gray');
var postcssPlugins = postcssJs.sync([ colorGrey ]);

var plugin = function (styles) {
  return postcssPlugins(styles);
};

cssx.minify(false);
cssx.plugins([ plugin ]);

var sheet = cssx();
sheet.add(<style>
  body {
    color: gray(85);
  }
</style>);
