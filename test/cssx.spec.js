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

// var only = '8'.split(',');
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
  describe('when we pass an id to the factory', function () {
    it('should create only one stylesheet', function () {
      cssx('something');
      cssx('something');
      cssx('something');
      expect(cssx.getStylesheets().length).to.be.equal(1);
    });
    describe('and when we pass same id multiple times', function () {
      it('should update the values 1', function () {
        var EXPECTED = 'a{b:10;c:10;d:10;}';
        var A = cssx('something');
        var B = cssx('something');
        A.add('a', { b: 1, c: 2 });
        A.add('a', { c: 10 });
        B.add('a', { b: 10, d: 10 });
        expect(cssx.getStylesheets().length).to.be.equal(1);
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
      it('should update the values 2', function () {
        var EXPECTED = 'a{b:1;c:2;}a{b:10;d:10;}';
        var A = cssx('A');
        var B = cssx('B');
        A.add('a', { b: 1, c: 2 });
        B.add('a', { b: 10, d: 10 });
        expect(cssx.getStylesheets().length).to.be.equal(2);
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
      it('should update the values 3', function () {
        var EXPECTED = 'a{b:10;c:10;e:10;}a{b:1;c:2;}';
        var A = cssx('A');
        var B = cssx('A');
        var C = cssx('B');
        A.add('a', { b: 1, c: 2 });
        B.add('a', { b: 10, c: 10, e: 10 });
        C.add('a', { b: 1, c: 2 });
        expect(cssx.getStylesheets().length).to.be.equal(2);
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
      it('should update the values 4', function () {
        var EXPECTED = 'body p{a:2;}p{a:1;}';
        var A = cssx('A');
        var body = A.add('body');
        A.add('p', { a: 1 });
        body.d('p', { a: 2 });
        expect(cssx.getStylesheets().length).to.be.equal(1);
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
      it('should update the values 5', function () {
        var EXPECTED = 'a{b:1;}';
        var selector = function () { return 'a'; };
        var A = cssx('A');
        var B = cssx('A');
        A.add(selector, { b: 1 });
        B.add(selector, { b: 1 });
        expect(minifyCSS(cssx.getCSS())).to.be.equal(EXPECTED);
      });
    });
  });

  describe('when we use the update API', function () {
    describe('and when we pass an object as a last parameter', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add('a > b', { c: 1 });
        S.update('a > b', { c: 2, d: 3 });
        expect(minifyCSS(cssx.getCSS())).to.be.equal('a > b{c:2;d:3;}');
      });
    });
    describe('and when we pass a function as a last parameter', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add('a > b', { c: 1 });
        S.update('a > b', function () { return { c: 2, d: 3 } });
        expect(minifyCSS(cssx.getCSS())).to.be.equal('a > b{c:2;d:3;}');
      });
    });
    describe('and when we have descendant selectors added by the api', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add('a > b').d('d').d('f', { g: 4 });
        S.update('a > b d f', function () { return { c: 2, d: 3 } });
        expect(minifyCSS(cssx.getCSS())).to.be.equal('a > b d f{g:4;c:2;d:3;}');
      });
    });
    describe('and when having descendant selectors but we type wrong path', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add('a > b').d('d').d('f', { g: 4 });
        S.update('a > b e f', { c: 2 });
        expect(minifyCSS(cssx.getCSS())).to.be.equal('a > b d f{g:4;}');
      });
    });
    describe('and when we have styles defined at the top level', function () {
      it('should result in the right css', function () {
        var S = cssx();
        S.add('body', { a: 1 });
        S.add('body p', { b: 1 });
        S.update('body', { c: 1 });
        expect(minifyCSS(cssx.getCSS())).to.be.equal('body{a:1;c:1;}body p{b:1;}');
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
  
  describe('when we update the graph', function () {
    var prop = '__$__cssx_rule';
    var cleanGraph = function (stylesheet) {
      var graph = stylesheet.graph();
      (function clean(g) {
        if (g[prop]) delete g[prop];
        for (var i in g) {
          clean(g[i]);
        }
      })(graph);
      return graph;
    };

    it('should have a proper graph 1', function () {
      var s = cssx();
      s.add('a', { b: 1 })
      expect(cleanGraph(s)).to.be.deep.equal({a:{}});
    });
    it('should have a proper graph 2', function () {
      var s = cssx();
      var a2 = s.add('a', { b: 1 }).d('a2');
      a2.d('a3');
      a2.d('a4');
      expect(cleanGraph(s)).to.be.deep.equal({
        a: {
          'a a2': {
            'a a2 a3': {},
            'a a2 a4': {}
          }
        }
      });
    });
    it('should have a proper graph 3', function () {
      var s = cssx();
      var a2 = s.add('a', { b: 1 }).d('a2 > p.something');
      a2.d('a3');
      a2.d('a4');
      expect(cleanGraph(s)).to.be.deep.equal({
        a: {
          'a a2 > p.something': {
            'a a2 > p.something a3': {},
            'a a2 > p.something a4': {}
          }
        }
      });
    });
    it('should have a proper graph 4', function () {
      var s = cssx();
      var a2 = s.add('a', { b: 1 }).n('a2 > p.something');
      a2.d('a3');
      a2.d('a4');
      expect(cleanGraph(s)).to.be.deep.equal({
        a: {
          'a a2 > p.something': {
            'a a2 > p.something a3': {},
            'a a2 > p.something a4': {}
          }
        }
      });
    });
    it('should have a proper graph 5', function () {
      var s = cssx();
      var a2 = s.add('a::foo bar > f', { b: 1 }).n('a2 > p.something');
      a2.d('a3');
      a2.d('a4');
      expect(cleanGraph(s)).to.be.deep.equal({
        'a::foo bar > f': {
          'a::foo bar > f a2 > p.something': {
            'a::foo bar > f a2 > p.something a3': {},
            'a::foo bar > f a2 > p.something a4': {}
          }
        }
      });
    });
    it('should have a proper graph 6', function () {
      var s = cssx();
      var a = s.add('a');
      a.n('a3');
      a.d('a4');
      expect(cleanGraph(s)).to.be.deep.equal({
        a: {
          'a a3': {},
          'a a4': {}
        }
      });
    });
    it('should have a proper graph 6', function () {
      var s = cssx();
      s.add('body');
      s.add('body p');
      expect(cleanGraph(s)).to.be.deep.equal({
        'body': {}, 'body p': {}
      });
    });
  });

  describe('when we update a rule that has no styles so far', function () {
    it('should set the rules and compile successfully', function () {
      var sheet = cssx();
      var rule = sheet.add('body');
      rule.update({ a: 1 });
      rule.update({ b: 2 });
      expect(sheet.getCSS()).to.be.equal('body {\n  a: 1;\n  b: 2;\n}\n');
    });
  });

});