var chai = require('chai');
var expect = chai.expect;
var gulp = require('gulp');
var cssx = require('../packages/gulp-cssx');
var assert = require('stream-assert-gulp');
var fs = require('fs');

var readFile = function (path) {
  return fs.readFileSync(path).toString('utf8');
}
var writeFile = function (path, data) {
  fs.writeFileSync(path, data);
}
var deleteFile = function (path) {
  fs.unlink(path);
}

describe('Given the gulp module', function () {

  beforeEach(function () {
    cssx.transpiler.reset();
  });

  describe('when we pass the plugin without any arguments', function () {
    it('should transpile the file', function (done) {
      var dir = function (f) { return './test/fixtures/gulp-cssx/1/' + f; };
      var expected = readFile(dir('expected.js'));
      var resultFile = dir('expected.result.js');

      gulp.src(dir('index.js'))
        .pipe(cssx())
        .pipe(assert.first(function(file) {
          var actual = file.contents.toString('utf8');
          writeFile(resultFile, actual);
          expect(actual).to.be.equal(expected);
          deleteFile(resultFile)
        }))
        .on('end', done);
    });
  });

  describe('when we pass the plugin with execute=true', function () {
    it('should result in CSS content', function (done) {
      var dir = function (f) { return './test/fixtures/gulp-cssx/2/' + f; };
      var expected = readFile(dir('expected.css'));
      var resultFile = dir('expected.result.css');

      gulp.src(dir('index.js'))
        .pipe(cssx({ execute: true }))
        .pipe(assert.first(function(file) {
          var actual = file.contents.toString('utf8');
          writeFile(resultFile, actual);
          expect(actual).to.be.equal(expected);
          deleteFile(resultFile)
        }))
        .on('end', done);
    });
  });

});