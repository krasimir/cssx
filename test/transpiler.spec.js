var CSSXTranspiler = require('../lib/cssx.transpiler');
var path = require('path');
var fs = require('fs');
var babylon = require('../src/transpiler/vendor/babylon');
var glob = require("glob");
var chai = require('chai');
var expect = chai.expect;

var tests = [];

glob.sync(__dirname + '/fixtures/transpiler/**/actual.js').forEach(function (actual) {
  var testDir = path.dirname(actual), testDirParts = testDir.split('/');
  var testName = 'test_' + testDirParts[testDirParts.length-1];

  tests.push({
    name: testName,
    actual: actual,
    expected: testDir + '/expected.js',
    testDir: testDir
  });
});

describe.only('Given the cssx transpiler', function () {
  tests.forEach(function (test) {
    describe('when running ' + test.name, function () {
      it('should pass actual and receive expected code', function () {
        var result, astFile = test.testDir + '/ast.json';
        fs.writeFileSync(astFile, json(test.actual));
        result = CSSXTranspiler(file(test.actual));
        expect(result).to.be.equal(file(test.expected));
        fs.unlinkSync(astFile);
      });
    });
  });
});

function file (f) {
  return fs.readFileSync(f, 'utf8')
};
function json (f) {
  return JSON.stringify(CSSXTranspiler.ast(file(f)), null, 2)
};