# CSSX-Transpiler

> Transpile `<style>` tags to valid JavaScript.

---

## Installation

`npm install cssx-transpiler -D`

---

## Simple usage

```js
var cssxTranspiler = require('cssx-transpiler');

var code = require('fs').readFileSync('./file.js', { encoding: 'utf8' }).toString();
/* let's say that the file contains =

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
      var _2 = {},
          _3 = {};
      _3['margin'] = margin + "px";
      _3['padding'] = '0';
      _2['body'] = _3;
      return _2;
    }.apply(this));
  };

*/

```

---

## API

#### `cssxTranspiler(<code>, <options>)`

* `code` - string
* `options` - key-value pairs. The available options are: `minified`, `compact`, `concise`, `quotes`. All the options are booleans.

Returns a transpiled version of the code;

#### `cssxTranspiler.ast(<code>)`

* `code` - string

Returns abstract syntax tree.

#### `cssxTranspiler.reset()`

While transpiling the module is creating bunch of unique ids in the format of `_<number>`. This method resets the number to 0.

---

## Transformations

CSSX transpiler is basically CSS to JSON process:

```css
.container {
  margin: 10px;
  padding: 20px;
}
```

is transformed to

```json
{
  ".container": {
    "margin": "10px",
    "padding": "20px"
  }
}
```

Nested styles like media queries:

```css
@media (max-width: 450px) {
  .container {
    width: 100%;
  }
}
```

results to:

```json
{
  "@media (max-width: 450px)": {
    ".container": {
      "width": "100%"
    }
  }
}
```

The libraries deals with same name properties in the following way:

```css
body {
  background: red;
  background: url(../img/image.png);
}
```

results to:

```json
{
  "body": {
    "background": [
      "red",
      "url(../img/image.png)"
    ]
  }
}
```

---

# Where to go from here

* [CSSX *language*](https://github.com/krasimir/cssx/blob/master/docs/cssx-lang.md)
* [CSSX client-side library](https://github.com/krasimir/cssx/tree/master/packages/cssx)
