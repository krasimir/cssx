import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/index.js',
  plugins: [ buble() ],
  targets: [
    {
      format: 'cjs',
      dest: 'dist/rollup-plugin-cssx.cjs.js'
    },
    {
      format: 'es6',
      dest: 'dist/rollup-plugin-cssx.es.js'
    }
  ]
};
