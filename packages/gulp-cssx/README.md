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
    .pipe(cssx())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['cssx']);
```