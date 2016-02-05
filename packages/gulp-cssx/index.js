var child_process = require('child_process');
var map = require('map-stream');
var gutil = require('gulp-util');
var cssxTranspiler = require('cssx-transpiler');

module.exports = function() {
   return map(function(file, cb) {
      var error = null, transpiled;
      try {
         transpiled = cssxTranspiler(file.contents.toString('utf8'))
      } catch (err) {
         cb(err);
         return;
      }
      file.contents = new Buffer(transpiled);
      cb(error, file);
   });
};