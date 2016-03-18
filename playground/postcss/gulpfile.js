var gulp = require('gulp');
var rename = require('gulp-rename');
var cssx = require('gulp-cssx');
var postcss = require('gulp-postcss');

gulp.task('default', function () {
  gulp.src('./src/index.js')
    .pipe(cssx({ execute: true }))
    .pipe(rename('styles.css'))
    .pipe( postcss([ require('autoprefixer') ]) )
    .pipe(gulp.dest('./dist'));
});