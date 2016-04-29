# Browserify transform plugin for CSSX

## Installation

```
npm i browserify-cssx
```

## Usage

```js
var browserify = require('browserify');
var cssxTransform = require('../../packages/browserify-cssx');

var CSSXTranspilerOptions = {
  minify: false
};

var b = browserify('src/index.js', {
  transform: [ cssxTransform ],
  cssx: CSSXTranspilerOptions
});
b.bundle(function (err, buff) {
  var code = buff.toString('utf8');
  console.log(code);
});   
```