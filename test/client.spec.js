var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var cssx = require('../lib/cssx');
var path = require('path');
var fs = require('fs');
var glob = require("glob");

chai.expect();
chai.use(sinonChai);
cssx.minify = false;

// var only = '1'.split(',');
var expect = chai.expect;
var document = {
  querySelector: sinon.stub().returns({
    appendChild: sinon.spy()
  }),
  createElement: sinon.stub().returns({
    setAttribute: sinon.spy(),
    parentNode: {
      removeChild: sinon.spy()
    }
  })
};
var expectInNextTick = function (message, work, expectations) {
  it(message, function (done) {
    work();
    setTimeout(function () {
      expectations();
      done();
    }, 4);  
  });  
};
var file = function (f) {
  return fs.readFileSync(f, 'utf8')
};

global.document = document;

describe('Given the cssx library', function () {

  beforeEach(function () {
    document.createElement.reset();
    cssx.clear();
  });

  describe('when we compile several times within the global namespace', function () {
    expectInNextTick('should create only one <style> element',
      function () {
        cssx.compile();
        cssx.compile();
        cssx.compile();
        cssx.compile();
        cssx.compile();
      },
      function () {
        expect(document.createElement).to.be.calledOnce;
      }
    );
  });
  describe('when we create multiple stylesheets', function () {
    expectInNextTick('should create multiple <style> element',
      function () {
        cssx.stylesheet().compile();
        cssx.stylesheet().compile();
        cssx.compile();
        cssx.compile();
        cssx.compile();
      },
      function () {
        expect(document.createElement).to.be.calledThrice;
      }
    );
  });
  describe('when we add rules', function () {
    var tests = [], testDir, testDirParts, testCaseDirName, testName;

    glob.sync(__dirname + '/fixtures/client/**/actual.js').forEach(function (actual) {
      testDir = path.dirname(actual);
      testDirParts = testDir.split('/');
      testCaseDirName = testDirParts[testDirParts.length-1];
      testName = 'test/fixtures/client/' + testCaseDirName;

      if (typeof only !== 'undefined' && only.length > 0 && only.indexOf(testCaseDirName.toString()) < 0) return;
      tests.push({
        name: testName,
        actual: actual,
        expected: testDir + '/expected.css',
        testDir: testDir
      });
    });

    tests.forEach(function (test) {
      describe('and when are running ' + test.name, function () {
        expectInNextTick('should compile the css correctly',
          function () {
            cssx.clear();
            require(test.actual)(cssx);
          },
          function () {
            fs.writeFileSync(test.expected + '.result', cssx.getCSS());
            expect(cssx.getCSS()).to.be.equal(file(test.expected));
            fs.unlinkSync(test.expected + '.result');
          }
        );
      });
    });
  });

});