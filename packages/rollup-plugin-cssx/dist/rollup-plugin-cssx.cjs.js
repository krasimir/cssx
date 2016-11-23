'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var cssxTranspiler = _interopDefault(require('cssx-transpiler'));
var MagicString = _interopDefault(require('magic-string'));
var rollupPluginutils = require('rollup-pluginutils');

function cssx(options) {
  if ( options === void 0 ) options = {};

  var filter = rollupPluginutils.createFilter(options.include, options.exclude);

  return {
    name: 'cssx',

    transform: function transform(code, id) {
      if (!filter(id)) {
        return null;
      }

      var s = new MagicString(code);
      var out = cssxTranspiler(code, options);

      s.overwrite(0, code.length, out.toString());

      return {
        code: s.toString(),
        map: s.generateMap({ hires: true })
      };
    }
  };
}

module.exports = cssx;