var CSSXTranspiler = require('../packages/cssx-transpiler/lib/cssx-transpiler');
var path = require('path');
var fs = require('fs');
var glob = require("glob");
var chai = require('chai');
var expect = chai.expect;
var d = describe;

var tests = [];
// var only = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33'.split(',');
// var only = '33'.split(',');

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
        var result, options = {};
        var astFile = test.testDir + '/ast.json';
        var resultFile = test.testDir + '/expect.result.js';

        if (fs.existsSync(test.testDir + '/options.json')) {
          options = require(test.testDir + '/options.json');
        }

        CSSXTranspiler.reset();
        fs.writeFileSync(astFile, json(test.actual));
        result = CSSXTranspiler(file(test.actual), options);
        fs.writeFileSync(resultFile, result);
        expect(result).to.be.equal(file(test.expected));
        fs.unlinkSync(astFile);
        fs.unlinkSync(resultFile);
      });
    });
  });
});

function file (f) {
  return fs.readFileSync(f, 'utf8');
};
function json (f) {
  return JSON.stringify(CSSXTranspiler.ast(file(f)), null, 2)
};