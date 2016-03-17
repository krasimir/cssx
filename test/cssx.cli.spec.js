var chai = require('chai');
var expect = chai.expect;
var exec = require('exec');
var fs = require('fs');
var rimraf = require('rimraf');

var run = function (cliArguments, callback, print) {
  var args = ['node', __dirname + '/../packages/cssx-cli/index.js'];

  Object.keys(cliArguments).forEach(function (arg) {
    args = args.concat([arg, cliArguments[arg]]);
  });
  exec(args, function (err, out, code) {
    if (print) {
      console.log('------------ err');
      console.log(err);
      console.log('------------ out');
      console.log(out);
      console.log('------------ code');
      console.log(code);
    }
    callback(err, out, code);
  });
}
var runWithArgs = function (input, output, callback, print) {
  rimraf(output, function () {
    run({
      '-i': input,
      '-o': output
    }, callback, print);  
  });
}

var isError = function (err) {
  expect(err).to.not.be.equal('');
}
var isNotError = function (err) {
  expect(err).to.be.equal('');
}
var deleteIfExists = function (file) {
  if (fs.stat(file)) {
    fs.unlinkSync(file);
  }
}

describe('Given the cssx-cli module', function () {

  describe('when call it without any arguments', function () {
    it('should generate an error', function (done) {
      run({}, function (err, out, code) {
        isError(err);
        expect(code).to.be.equal(1);
        done();
      });
    });
  });
  describe('when call it with arguments but empty values', function () {
    it('should generate an error', function (done) {
      this.timeout(4000);
      run({ '-i': '' }, function (err, out, code) {
        isError(err);
        expect(code).to.be.equal(1);
        run({ '-i': 'something', '-o': '' }, function (err, out, code) {
          isError(err);
          expect(code).to.be.equal(1);
          done();
        });
      });
    });
  });
  describe('when compiling a single file', function () {
    it('should produce a proper file', function (done) {
      var input = './test/fixtures/cssx-cli/single-file/code.js';
      var output = './test/fixtures/cssx-cli/single-file/result';
      runWithArgs(input, output, function (err, out, code) {
        fs.stat(output, function (statErr, stats) {
          if (statErr) throw statErr;
          rimraf(output, function() {
            done();
          });
        });
      });
    });
  });
  describe('when compiling multiple files', function () {
    it('should produce the new files', function (done) {
      var input = './test/fixtures/cssx-cli/multiple-files/src/**/*.js';
      var output = './test/fixtures/cssx-cli/multiple-files/dist';
      runWithArgs(input, output, function (err, out, code) {
        fs.stat(output, function (statErr, stats) {
          if (statErr) throw statErr;
          try {
            fs.statSync(output + '/a.js');
            fs.statSync(output + '/b/c.js');
          } catch (err) {
            console.log(err);
          }
          rimraf(output, function() {
            done();
          });
        });
      });
    });
  });
  describe('when setting output type to css', function () {
    it('should produce css', function (done) {
      var input = './test/fixtures/cssx-cli/to-css/src/index.js';
      var output = './test/fixtures/cssx-cli/to-css/dist/styles.css';
      rimraf(output, function () {
        run({ '-i': input, '-o': output, '-m': 'css' }, function (err, out, code) {
          fs.stat(output, function (statErr, stats) {
            if (statErr) throw statErr;
            rimraf(output, function() {
              done();
            });
          });
        });
      });
    });
  });

});