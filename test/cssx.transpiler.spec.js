var CSSXTranspiler = require('../packages/cssx-transpiler/lib/cssx-transpiler');
var path = require('path');
var fs = require('fs');
var glob = require("glob");
var chai = require('chai');
var expect = chai.expect;
var d = describe;

var tests = [];
// var only = '22'.split(',');

glob.sync(__dirname + '/fixtures/cssx-transpiler/**/actual.js').forEach(function (actual) {
  var testDir = path.dirname(actual), testDirParts = testDir.split('/');
  var testCaseDirName = testDirParts[testDirParts.length-1];
  var testName = 'test/fixtures/cssx-transpiler/' + testCaseDirName;
  var includeTest = false;

  if (typeof only !== 'undefined') {
    if (only.length > 0 && (only.indexOf(testCaseDirName.toString()) >= 0 || only === 'all')) {
      includeTest = true;
    }
  } else {
    includeTest = true;
  }

  if (includeTest) {
    tests.push({
      name: testName,
      actual: actual,
      expected: testDir + '/expected.js',
      testDir: testDir
    });
  }
});

if (typeof only !== 'undefined') d = describe.only;

d('Given the cssx transpiler', function () {
  tests.forEach(function (test) {
    describe('when running ' + test.name, function () {
      it('should pass actual and receive expected code', function () {
        var result;
        var astFile = test.testDir + '/ast.json';
        var resultFile = test.testDir + '/expect.result.js';

        CSSXTranspiler.reset();
        fs.writeFileSync(astFile, json(test.actual));
        result = CSSXTranspiler(file(test.actual));
        fs.writeFileSync(resultFile, result);
        expect(result).to.be.equal(file(test.expected));
        fs.unlinkSync(astFile);
        fs.unlinkSync(resultFile);
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