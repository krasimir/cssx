var CSSXTranspiler = require('../packages/cssx-transpiler/lib/cssx-transpiler');
var cssx = require('../packages/cssx/lib/cssx');
var path = require('path');
var fs = require('fs');
var babylon = require('../packages/cssx-transpiler/src/vendor/babylon');
var glob = require("glob");
var chai = require('chai');
var expect = chai.expect;
var d = describe;

var tests = [];
// var only = '1,2,3,4,5,6,7,8,9,10'.split(',');

glob.sync(__dirname + '/fixtures/cssx-complete/**/actual.js').forEach(function (actual) {
  var testDir = path.dirname(actual), testDirParts = testDir.split('/');
  var testCaseDirName = testDirParts[testDirParts.length-1];
  var testName = 'test/fixtures/cssx-complete/' + testCaseDirName;

  if (typeof only !== 'undefined' && only.length > 0 && only.indexOf(testCaseDirName.toString()) < 0) return;
  tests.push({
    name: testName,
    actual: actual,
    expected: testDir + '/expected.css',
    testDir: testDir
  });
});

if (typeof only !== 'undefined') d = describe.only;

d('Given the transpiler and client side library', function () {
  tests.forEach(function (test) {
    describe('when running ' + test.name, function () {
      it('should pass actual and receive expected code', function () {
        var transpiled;
        var astFile = test.testDir + '/ast.json';
        var transpiledFile = test.testDir + '/transpiled.js';
        var cssExprectedFile = test.testDir + '/exected.css.result';
        var generatedCSS = '';

        this.timeout(5000);

        CSSXTranspiler.reset();
        fs.writeFileSync(astFile, json(test.actual));
        transpiled = CSSXTranspiler(file(test.actual));
        fs.writeFileSync(transpiledFile, transpiled);

        cssx.clear();
        func = new Function('cssx', transpiled);
        func(cssx);
        generatedCSS = cssx.getStylesheets().map(function (stylesheet) {
          return stylesheet.compileImmediate().getCSS();
        });
        generatedCSS = generatedCSS.join('');
        fs.writeFileSync(cssExprectedFile, generatedCSS);

        expect(generatedCSS).to.be.equal(file(test.expected));

        fs.unlinkSync(astFile);
        fs.unlinkSync(transpiledFile);
        fs.unlinkSync(cssExprectedFile);
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