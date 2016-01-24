var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var cssx = require('../lib/cssx');

chai.expect();
chai.use(sinonChai);

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

global.document = document;

describe('Given the cssx library', function () {

  beforeEach(function () {
    document.createElement.reset();
    cssx.clear();
  });

  describe('when we call build several times within the global namespace', function () {
    it('should create only one <style> element', function () {
      cssx.compile();
      cssx.compile();
      cssx.compile();
      cssx.compile();
      cssx.compile();
      expect(document.createElement).to.be.calledOnce;
    });
  });
  describe('when we create multiple stylesheets', function () {
    it('should create multiple <style> element', function () {
      cssx.stylesheet().compile();
      cssx.stylesheet().compile();
      cssx.compile();
      cssx.compile();
      cssx.compile();
      expect(document.createElement).to.be.calledThrice;
    });
  });
  describe('when we add a rule', function () {
    it('should build the css correctly', function () {
      cssx.add('body', { 'margin': '10px' });
      expect(cssx.compile()).to.be.equal('body{margin:10px;}');
    });
  });
  describe('when we have nested rules', function () {
    it('should build the css correctly', function () {
      cssx
      .add('body')
        .add('h1', { 'padding': '.1em' })
          .add('small', { 'font-size': '0.3em' });
      expect(cssx.compile()).to.be.equal('body h1{padding:.1em;}body h1 small{font-size:0.3em;}');
    });
  });
  describe('when we add multiple rules to same scope', function () {
    it('should build the css correctly', function () {
      var body = cssx.add('body', { 'a': 1 });
      cssx.add('footer', { 'b': 2 })
      body.add('h1', { 'c': 3 });
      body.add('p', { 'd': 4 });
      expect(cssx.compile()).to.be.equal('body{a:1;}body h1{c:3;}body p{d:4;}footer{b:2;}');
    });
  });
  describe('when we add a rule without props', function () {
    it('should NOT create a css entry for it', function () {
      var body = cssx.add('body');
      expect(cssx.compile()).to.be.equal('');
    });
  });
  describe('when we send a function for selector', function () {
    it('should NOT create a css entry for it', function () {
      var selector = function () {
        return 'body > p';
      };
      var body = cssx.add(selector, { a: 1 });
      expect(cssx.compile()).to.be.equal('body > p{a:1;}');
    });
  });
  describe('when we send a function for props', function () {
    it('should NOT create a css entry for it', function () {
      var styles = function () {
        return { b: 2 };
      };
      var body = cssx.add('a', styles);
      expect(cssx.compile()).to.be.equal('a{b:2;}');
    });
  });
  describe('when build is called with doNotApplyToPage=true', function () {
    it('should NOT create a <style> element', function () {
      var body = cssx.add('body', { a: 1 });
      cssx.compile(true);
      expect(document.createElement).to.not.be.called;
    });
  });

});