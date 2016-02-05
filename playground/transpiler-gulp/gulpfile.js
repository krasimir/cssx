var gulp = require('gulp');
var plugin = require('./plugin');

gulp.task('cssx', function() {
  gulp.src('src/*.js')
    .pipe(plugin())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['cssx'])
});

gulp.task('default', ['cssx', 'watch']);