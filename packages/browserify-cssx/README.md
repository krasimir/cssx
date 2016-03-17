# Browserify transform plugin for CSSX

## Installation

```
npm i browserify-cssx
```

## Usage

```js
var browserify = require('browserify');
var cssxTransform = require('browserify-cssx');

var b = browserify('src/index.js', {
  transform: [ cssxTransform ]
});
b.bundle(function (err, buff) {
  var code = buff.toString('utf8');
});  
```