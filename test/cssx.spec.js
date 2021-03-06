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

// var only = '2'.split(',');
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
      cssx('A').compile();
      cssx('B').compile();
      cssx('C').compile();
      expect(document.createElement).to.not.be.called;
      cssx.domChanges(true);
    });
  });
  describe('when we compile several times within the global namespace', function () {
    it('should create only one <style> element', function () {
      styles = cssx('A');
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
      cssx('A').compile();
      cssx('B').compile();
      cssx('C').compile();
      expect(document.createElement).to.be.calledThrice;
    });
  });
  describe('when we use destroy method', function () {
    it('should create multiple <style> element', function () {
      var A = cssx('A').compile();
      expect(removeChild).to.not.be.called;
      A.destroy();
      expect(removeChild).to.be.calledOnce;
    });
  });
  describe('when we register rules', function () {
    describe('and when we pass same id multiple times', function () {
      it('should create only one stylesheet', function () {
        cssx('something');
        cssx('something');
        cssx('something');
        expect(cssx.getStylesheets().length).to.be.equal(1);
      });
    });
    describe('when we use nesting', function () {
      it('should set a proper parent to the CSSRule object', function () {
        var sheet = cssx();
        var A = sheet.add({ a: {} });
        var B = A.nested({ b: { c: 1 }});
        expect(B.parent).to.not.be.equal(null);
        expect(B.parent.selector).to.be.equal('a');
      });
    });
    it('should update the values 1', function () {
      var EXPECTED = 'a{b:10;c:10;d:10;}';
      var A = cssx('something');
      var B = cssx('something');
      A.add({ a: { b: 1, c: 2 } });
      A.add({ a: { c: 10 } });
      B.add({ a: { b: 10, d: 10 } });
      expect(cssx.getStylesheets().length).to.be.equal(1);
      expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
    });
    it('should update the values 2', function () {
      var EXPECTED = 'a{b:1;c:2;}a{b:10;d:10;}';
      var A = cssx('A');
      var B = cssx('B');
      A.add({ a: { b: 1, c: 2 }});
      B.add({ a: { b: 10, d: 10 }});
      expect(cssx.getStylesheets().length).to.be.equal(2);
      expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
    });
    it('should update the values 3', function () {
      var EXPECTED = 'a{b:10;c:10;e:10;}a{b:1;c:2;}';
      var A = cssx('A');
      var B = cssx('A');
      var C = cssx('B');
      A.add({ a: { b: 1, c: 2 }});
      B.add({ a: { b: 10, c: 10, e: 10 }});
      C.add({ a: { b: 1, c: 2 }});
      expect(cssx.getStylesheets().length).to.be.equal(2);
      expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
    });
    it('should update the values 4', function () {
      var EXPECTED = 'body p{a:2;}p{a:1;}';
      var A = cssx('A');
      var body = A.add({ body: {} });
      A.add({ p: { a: 1 } });
      body.d({ p: { a: 2 } });
      expect(cssx.getStylesheets().length).to.be.equal(1);
      expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
    });
    it('should update the values 5', function () {
      var EXPECTED = 'a{b:1;}';
      var selector = function () { return { a: { b: 1 } }; };
      var A = cssx('A');
      var B = cssx('A');
      A.add(selector);
      B.add(selector);
      expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
    });
    it('should update the values 6', function () {
      var EXPECTED = 'a{question:What is the answer?;b{answer:100;}}';
      var sheet = cssx('A');
      sheet.add({
        a: {
          question: 'What is the answer?',
          b: { answer: 42 }
        }
      });
      sheet.add({
        a: { b: { answer: 100 } }
      });

      expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
    });
    it('should update the values 7', function () {
      var EXPECTED = 'a{margin:1;padding:2;a_inner{a_inner2{margin:1;padding:2;}}}b{b_inner{margin:100;padding:100;b_inner2{padding:3;}}}';
      var sheet = cssx('A');
      sheet.add({
        a: {
          margin: 1,
          padding: 2,
          a_inner: {
            a_inner2: {
              margin: 1,
              padding: 2
            }
          }
        },
        b: {
          b_inner: {
            margin: 3,
            b_inner2: {
              padding: 3
            }
          }
        }
      });
      sheet.add({
        b: { b_inner: { margin: 100, padding: 100 } }
      });

      expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
    });
  });

  describe('when we use the update API', function () {
    describe('and when we pass an object', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add({ 'a > b': { c: 1 } });
        S.update({ 'a > b': { c: 2, d: 3 } });
        expect(minifyCSS(cssx.getCSS())).to.be.equal('a > b{c:2;d:3;}');
      });
    });
    describe('and when we pass a function', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add({ 'a > b': { c: 1 } });
        S.update({ 'a > b': function () { return { c: 2, d: 3 } } });
        expect(minifyCSS(cssx.getCSS())).to.be.equal('a > b{c:2;d:3;}');
      });
    });
    describe('and when we have descendant selectors added by the api', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add({ 'a > b': {}}).d({ d: {} }).d({ f: { g: 4 } });
        S.update({ 'a > b d f': function () { return { c: 2, d: 3 } }});
        expect(minifyCSS(cssx.getCSS())).to.be.equal('a > b d f{g:4;c:2;d:3;}');
      });
    });
    describe('and when having descendant selectors but we type wrong path', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add({'a > b': {}}).d({ d: {} }).d({ f: { g: 4 }});
        S.update({ 'a > b e f': { c: 2 }});
        expect(minifyCSS(cssx.getCSS())).to.be.equal('a > b d f{g:4;}a > b e f{c:2;}');
      });
    });
    describe('and when we have styles defined at the top level', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add({ 'body': { a: 1 }});
        S.add({ 'body p': { b: 1 }});
        S.update({ 'body': { c: 1 }});
        expect(minifyCSS(cssx.getCSS())).to.be.equal('body{a:1;c:1;}body p{b:1;}');
      });
    });
  });

  describe('when we add rules from fixtures', function () {
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
            styles = cssx('A');
            require(test.actual)(styles);
            fs.writeFileSync(test.expected + '.result', styles.getCSS());
            expect(styles.getCSS()).to.be.equal(file(test.expected));
            fs.unlinkSync(test.expected + '.result');
          }
        );
      });
    });
  });

  describe('when we update a rule that has no styles so far', function () {
    it('should set the rules and compile successfully', function () {
      var sheet = cssx();
      var rule = sheet.add({ body: {} });
      rule.update({ a: 1 });
      rule.update({ b: 2 });
      expect(sheet.getCSS()).to.be.equal('body {\n  a: 1;\n  b: 2;\n}\n');
    });
  });

  describe('when using a plugin', function () {
    it('should run the plugin against the produced CSS', function () {
      var sheet;
      var plugin = function (styles) {
        styles['margin'] = '10px';
        return styles;
      };

      cssx.plugins([ plugin ]);
      sheet = cssx();
      p = sheet.add({ 'p': { 'line-height': '60px' }});
      p.d({ 'small': { 'line-height': '45px' }});
      expect(cssx.getCSS()).to.be.equal('p small {\n  line-height: 45px;\n  margin: 10px;\n}\np {\n  line-height: 60px;\n  margin: 10px;\n}\n');
    });
  });

});