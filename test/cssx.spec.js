var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var cssx = require('../packages/cssx/lib/cssx');
var path = require('path');
var fs = require('fs');
var glob = require("glob");
var minifyCSS = require('./helpers/minifyCSS');
var d = describe;

chai.expect();
chai.use(sinonChai);

cssx.minify(false);
cssx.nextTick(false);

// var only = '7'.split(',');
var expect = chai.expect;
var removeChild = sinon.spy();
var document = {
  querySelector: sinon.stub().returns({
    appendChild: sinon.spy()
  }),
  createElement: sinon.stub().returns({
    setAttribute: sinon.spy(),
    parentNode: {
      removeChild: removeChild
    }
  })
};
var styles, file = function (f) {
  return fs.readFileSync(f, 'utf8')
};

global.document = document;

if (typeof only !== 'undefined') d = describe.only;

d('Given the cssx library', function () {

  beforeEach(function () {
    document.createElement.reset();
    cssx.clear();
    removeChild.reset();
  });

  describe('when we use disableDOMChanges and enableDOMChanges', function () {
    it('should create multiple <style> element', function () {
      cssx.domChanges(false);
      cssx.stylesheet('A').compile();
      cssx.stylesheet('B').compile();
      cssx.stylesheet('C').compile();
      expect(document.createElement).to.not.be.called;
      cssx.domChanges(true);
    });
  });
  describe('when we compile several times within the global namespace', function () {
    it('should create only one <style> element', function () {
      styles = cssx.stylesheet('A');
      styles.compile();
      styles.compile();
      styles.compile();
      styles.compile();
      styles.compile();
      expect(document.createElement).to.be.calledOnce;
    });
  });
  describe('when we create multiple stylesheets', function () {
    it('should create multiple <style> element', function () {
      cssx.stylesheet('A').compile();
      cssx.stylesheet('B').compile();
      cssx.stylesheet('C').compile();
      expect(document.createElement).to.be.calledThrice;
    });
  });
  describe('when we use destroy method', function () {
    it('should create multiple <style> element', function () {
      var A = cssx.stylesheet('A').compile();
      expect(removeChild).to.not.be.called;
      A.destroy();
      expect(removeChild).to.be.calledOnce;
    });
  });
  describe('when we pass an id to the factory', function () {
    it('should create only one stylesheet', function () {
      cssx.stylesheet('something');
      cssx.stylesheet('something');
      cssx.stylesheet('something');
      expect(cssx.getStylesheets().length).to.be.equal(1);
    });
    describe('and when we pass same id multiple times', function () {
      it('should update the values 1', function () {
        var EXPECTED = 'a{b:10;c:10;d:10;}';
        var A = cssx.stylesheet('something');
        var B = cssx.stylesheet('something');
        A.add('a', { b: 1, c: 2 });
        A.add('a', { c: 10 });
        B.add('a', { b: 10, d: 10 });
        expect(cssx.getStylesheets().length).to.be.equal(1);
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
      it('should update the values 2', function () {
        var EXPECTED = 'a{b:1;c:2;}a{b:10;d:10;}';
        var A = cssx.stylesheet('A');
        var B = cssx.stylesheet('B');
        A.add('a', { b: 1, c: 2 });
        B.add('a', { b: 10, d: 10 });
        expect(cssx.getStylesheets().length).to.be.equal(2);
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
      it('should update the values 3', function () {
        var EXPECTED = 'a{b:10;c:10;e:10;}a{b:1;c:2;}';
        var A = cssx.stylesheet('A');
        var B = cssx.stylesheet('A');
        var C = cssx.stylesheet('B');
        A.add('a', { b: 1, c: 2 });
        B.add('a', { b: 10, c: 10, e: 10 });
        C.add('a', { b: 1, c: 2 });
        expect(cssx.getStylesheets().length).to.be.equal(2);
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
      it('should update the values 4', function () {
        var EXPECTED = 'body p{a:2;}p{a:1;}';
        var A = cssx.stylesheet('A');
        var body = A.add('body');
        A.add('p', { a: 1 });
        body.d('p', { a: 2 });
        expect(cssx.getStylesheets().length).to.be.equal(1);
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
      it('should update the values 5', function () {
        var EXPECTED = 'a{b:1;}';
        var selector = function () { return 'a'; };
        var A = cssx.stylesheet('A');
        var B = cssx.stylesheet('A');
        A.add(selector, { b: 1 });
        B.add(selector, { b: 1 });
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
    });
  });
  describe('when we use the update API', function () {
    describe('and when we pass a selector', function () {
      it('should result in the right css', function () {
        var EXPECTED = 'a > b{c:2;}';
        var S = cssx.s('S');
        S.add('a > b', { c: 1 });
        S.update('a > b', 'c', 2);
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
    });
  });
  describe('when we add rules', function () {
    var tests = [], testDir, testDirParts, testCaseDirName, testName;

    glob.sync(__dirname + '/fixtures/cssx/**/actual.js').forEach(function (actual) {
      testDir = path.dirname(actual);
      testDirParts = testDir.split('/');
      testCaseDirName = testDirParts[testDirParts.length-1];
      testName = 'test/fixtures/cssx/' + testCaseDirName;

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
        it('should compile the css correctly', function () {
            styles = cssx.stylesheet('A');
            require(test.actual)(styles);
            fs.writeFileSync(test.expected + '.result', styles.getCSS());
            expect(styles.getCSS()).to.be.equal(file(test.expected));
            fs.unlinkSync(test.expected + '.result');
          }
        );
      });
    });
  });

});