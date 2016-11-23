import cssxTranspiler from 'cssx-transpiler';
import MagicString from 'magic-string';
import { createFilter } from 'rollup-pluginutils';

function cssx(options) {
  if ( options === void 0 ) options = {};

  var filter = createFilter(options.include, options.exclude);

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

export default cssx;