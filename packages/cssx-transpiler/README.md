# CSSX-Transpiler

> Transpile `<style>` tags to valid JavaScript

---

## Simple usage

```js
var cssxTranspiler = require('cssx-transpiler');

var code = require('fs').readFileSync('./file.js', { encoding: 'utf8' }).toString();
/* let's say that code =

  var styles = function (margin) {
    return <style>
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
    return (function () {
      var _3 = {};
      _3['padding'] = '0';
      _3['margin'] = margin + "px";
      var _2 = [];

      _2.push(['body', _3]);

      return _2;
    }.apply(this));
  };

*/

```

---

## API

#### `cssxTranspiler(<code>, <options>)`

* `code` - string
* `options` - key-value pairs. The available options are: `minified`, `compact`, `concise`, `quotes`, `format`. All the options are booleans except `format` which could be `array` (by default) or `object`.

Returns a transpiled version of the code;

#### `cssxTranspiler.ast(<code>)`

* `code` - string

Returns abstract syntax tree.

#### `cssxTranspiler.reset()`

While transpiling the module is creating bunch of unique ids in the format of `_<number>`. This method resets the number to 0.

---

## Transformations

CSSX transpiler uses array of arrays to represent CSS styles. For example:

```css
.container {
  margin: 10px;
  padding: 20px;
}
```

is transformed to

```json
[
  [
    ".container",
    {
      "padding": "20px",
      "margin": "10px"
    }
  ]
]
```

If you use `format: 'object'` you'll get:

```json
{
  ".container": {
    "padding": "20px",
    "margin": "10px"
  }
}
```

Nested styles like media queries are treated a little bit different. They are wrapped in objects:

```css
@media (max-width: 450px) {
  .container {
    width: 100%;
  }
}
```

```json
[
  {
    "@media (max-width: 450px)": [
      [
        ".container",
        {
          "width": "100%"
        }
      ]
    ]
  }
]
```

If you use `format: 'object'` you'll get:

```js
{
  "@media (max-width: 450px)": {
    ".container": {
      "width": "100%"
    }
  }
}
```

---

# Where to go from here

* [CSSX *language*](https://github.com/krasimir/cssx/blob/master/docs/cssx-lang.md)
* [CSSX client-side library](https://github.com/krasimir/cssx/tree/master/packages/cssx)
