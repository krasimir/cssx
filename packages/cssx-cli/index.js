#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var glob = require('glob');
var mode = argv.m || 'js';
var gulp = require('gulp');
var gulpCSSX = require('gulp-cssx');
var plumber = require('gulp-plumber');
var gcallback = require('gulp-callback');
var browserify = require('browserify');
var fs = require('fs');
var cssxTransform = require('browserify-cssx');
var cssx = require('cssx');
var fsExtra = require('fs-extra');

cssx.domChanges(false);
cssx.minify(false);

var verify = function () {
  if (typeof argv.i === 'undefined' || argv.i === 'undefined' || argv.i === '' || typeof argv.i !== 'string') {
    throw new Error('Missing or empty input (`-i` argument).');
    process.exit(1);
  }
  if (typeof argv.o === 'undefined' || argv.o === 'undefined' || argv.o === '' || typeof argv.o !== 'string') {
    throw new Error('Missing or empty output (`-o` argument).');
    process.exit(1);
  }
  if (mode !== 'js' && mode !== 'css') {
    throw new Error('Wrong output type. Use `-m js` or `-m css`.'); 
    process.exit(1);
  }
  return true;
}

var execute = function (done) {
  console.log('---------------------------------- mode = ' + mode);
  // transpiler only
  if (mode === 'js') {
    gulp.src(argv.i)
      .pipe(plumber())
      .pipe(gulpCSSX())
      .pipe(gulp.dest(argv.o))
      .pipe(gcallback(done));

  // transpiler and bundler
  } else if (mode === 'css') {
    fs.stat(argv.i, function (err, stats) {
      if (err) throw(err);
      var b = browserify(argv.i, {
        transform: [ cssxTransform ]
      });
      b.bundle(function (err, buff) {
        if (err) throw err;
        var codeToRun = buff.toString('utf8'), func, generatedCSS, css;
        try {
          func = new Function('cssx', codeToRun);
          func(cssx);
          generatedCSS = cssx.getStylesheets().map(function (stylesheet) {
            return stylesheet.compileImmediate().getCSS();
          });
          css = generatedCSS.join('');
        } catch (err) {
          throw err;
        }
        fsExtra.outputFile(argv.o, css, function (err) {
          if (err) throw err;
          done();
        })
      });  
    });
  }
}

verify();

console.log('Input: ' + argv.i);
console.log('Output: ' + argv.o);
execute(function () {
  console.log('CSSX processed successful.');
});
