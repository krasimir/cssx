# Rollup transform plugin for CSSX

## Installation

```
npm i rollup-plugin-cssx
```

## Usage

```js
// rollup.config.js
import cssx from 'rollup-plugin-cssx';

export default {
  entry: 'src/index.js',
  dest: 'dist/my-lib.js',
  plugins: [
    cssx({
      // a minimatch pattern or an array of minimatch patterns relative to
      // process.cwd() specifying files to include
      include: 'src/**/*.js',

      // a minimatch pattern or an array of minimatch patterns relative to
      // process.cwd() specifying files to exclude
      exclude: 'src/exclude.js'
    })
  ]
};
```
