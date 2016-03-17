var child_process = require('child_process');
var map = require('map-stream');
var gutil = require('gulp-util');
var cssxTranspiler = require('cssx-transpiler');
var browserify = require('browserify');
var cssxTransform = require('browserify-cssx');
var intoStream = require('into-stream');
var cssx = require('cssx');
var path = require('path');

cssx.domChanges(false);
cssx.minify(false);

module.exports = function(options) {
   var ops = {
      execute: options && options.execute ? options.execute : false
   };

   return map(function(file, cb) {
      var error = null, transpiled;

      // execute to css
      if (ops.execute) {        
        var b = browserify(intoStream(file.contents), {
          transform: [ cssxTransform ],
          basedir: path.dirname(file.path)
        });        
        b.bundle(function (err, buff) {          
          var codeToRun = buff.toString('utf8'), func, generatedCSS, css;

          try {
            func = new Function('cssx', codeToRun);
            func(cssx);
            generatedCSS = cssx.getStylesheets().map(function (stylesheet) {
              return stylesheet.compileImmediate().getCSS();
            });
            css = generatedCSS.join('');
          } catch (err) {
            cb(err); return;
          }
          file.contents = new Buffer(css);
          cb(error, file);
        });  
      // transpile
      } else {
         try {
            transpiled = cssxTranspiler(file.contents.toString('utf8'))
         } catch (err) {
            cb(err);
            return;
         }
         file.contents = new Buffer(transpiled);
         cb(error, file);
      }

   });
};

module.exports.transpiler = cssxTranspiler;