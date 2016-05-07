# JSPM integration

[jspm](http://jspm.io/) is a package manager for the SystemJS universal module loader. This folder contains an example of CSSX transpilation using jspm build process.

## How to make jspm compiling CSSX properly

The CSSX transpiler is distributed as a bundle produced by [browserify](http://browserify.org/). As such the resolving of the `require` calls inside is handled by browserify. However, when we import [`cssx-transpiler.js`](https://github.com/krasimir/cssx/tree/master/packages/cssx-transpiler) as a dependency SystemJS tries dealing with the requires in the bundle and we get an [`ENOENT` error](https://github.com/jspm/jspm-cli/issues/1788). I didn't find any sensible solution of the issue so I decided to copy [`cssx-transpiler.js`](https://github.com/krasimir/cssx/tree/master/packages/cssx-transpiler/lib) in the project and don't declare it as a jspm (npm) dependency. 

The input files are:

```js
// lib/index.js
import styles from './styles.js!cssx';

function init() {
  document.querySelector('body').innerHTML = '<pre>' + JSON.stringify(styles, null, 2) + '<pre>';
}

init();
```
```js
// lib/styles.js
module.exports = <style>
  body {
    font-size: 18px;
  }
</style>;
```

which after running `jspm bundle lib/index` leads to:

```js
System.registerDynamic("lib/styles.js!cssx.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = (function() {
    var _1 = {},
        _2 = {};
    _2['font-size'] = '18px';
    _1['body'] = _2;
    return _1;
  }.apply(this));
  return module.exports;
});

System.register('lib/index.js', ['lib/styles.js!cssx.js'], function (_export) {
  'use strict';

  var styles;

  function init() {
    document.querySelector('body').innerHTML = '<pre>' + JSON.stringify(styles, null, 2) + '<pre>';
  }

  return {
    setters: [function (_libStylesJsCssxJs) {
      styles = _libStylesJsCssxJs['default'];
    }],
    execute: function () {
      init();
    }
  };
});
//# sourceMappingURL=build.js.map
```