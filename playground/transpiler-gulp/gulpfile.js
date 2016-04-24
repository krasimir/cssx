var gulp = require('gulp');
// var cssx = require('../../packages/gulp-cssx');
var cssx = require('gulp-cssx');
var plumber = require('gulp-plumber');

gulp.task('cssx', function() {
  gulp.src('src/*.js')
    .pipe(plumber())
    .pipe(cssx({
      format: 'object'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['cssx'])
});

gulp.task('tocss', function () {
  gulp.src('src/app.js')
    .pipe(cssx({
      execute: true
    }))
    .pipe(gulp.dest('./dist'));
})

gulp.task('default', ['cssx', 'watch']);