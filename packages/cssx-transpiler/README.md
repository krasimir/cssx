# CSSX-Transpiler

> Transpiler CSSX to valid JavaScript

---

## Simple usage

```js
var cssxTranspiler = require('cssx-transpiler');

var code = require('fs').readFileSync('./file.js', { encoding: 'utf8' }).toString();
/* let's say that code =

  var styles = function (margin) {
    <style>
      body {
        margin: `margin`px;
        padding: 0;
      }
    </style>
  };

*/

var transpiled = cssxTranspiler(code, { minified: false });
console.log(transpiled);
/*

  var styles = function (margin) {
    (function () {
      var _2 = {};
      _2['padding'] = '0';
      _2['margin'] = margin + "px";

      var _1 = cssx('_1');

      _1.add('body', _2);

      return _1;
    }.apply(this))
  };

*/

```

---

## API

#### `cssxTranspiler(<code>, <options>)`

* `code` - string
* `options` - key-value pairs. The available options are: `minified`, `compact`, `concise`, `quotes`

Returns a transpiled version of the code;

#### `cssxTranspiler.ast(<code>)`

* `code` - string

Returns abstract syntax tree.

#### `cssxTranspiler.reset()`

While transpiling the module is creating bunch of unique ids in the format of `_<number>`. This method resets the number to 0.

---

# Where to go from here

* [CSSX *language](https://github.com/krasimir/cssx/blob/master/docs/cssx-lang.md)
* [CSSX client-side library](https://github.com/krasimir/cssx/tree/master/packages/cssx)
