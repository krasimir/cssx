var gulp = require('gulp');
var cssx = require('gulp-cssx');
var plumber = require('gulp-plumber');

gulp.task('cssx', function() {
  gulp.src('src/*.js')
    .pipe(plumber())
    .pipe(cssx())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['cssx'])
});

gulp.task('default', ['cssx', 'watch']);