import cssxTranspiler from 'cssx-transpiler';
import MagicString from 'magic-string';
import { createFilter } from 'rollup-pluginutils';

export default function cssx ( options = {} ) {
  const filter = createFilter( options.include, options.exclude );

  return {
    name: 'cssx',

    transform ( code, id ) {
      if ( !filter( id ) ) {
        return null;
      }

      let s = new MagicString( code );
      let out = cssxTranspiler( code, options );
      s.overwrite( 0, code.length, out.toString() );

      return  {
        code: s.toString(),
        map: s.generateMap({ hires: true })
      };
    }
  };
}
