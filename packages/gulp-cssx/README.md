# gulp-cssx

Gulp plugin for [CSSX](https://github.com/krasimir/cssx) syntax.

## Installation

`npm i gulp-cssx -D`

## Usage

```js
var gulp = require('gulp');
var cssx = require('gulp-cssx');

gulp.task('cssx', function() {
  gulp.src('src/*.js')
    .pipe(cssx({
      minify: false
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['cssx']);
```

or if you want to produce a CSS file:

```js
var rename = require('gulp-rename');

gulp.src('src/index.js')
  .pipe(cssx({ execute: true }))
  .pipe(rename('styles.css'))
  .pipe(gulp.dest('./dist'));
```