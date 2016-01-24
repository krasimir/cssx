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
    cssx.clear();
  });

  describe('when we call build several times within the global namespace', function () {
    it('should create only one <style> element', function () {
      cssx.build();
      cssx.build();
      cssx.build();
      cssx.build();
      cssx.build();
      expect(document.createElement).to.be.calledOnce;
    });
  });
  describe('when we create multiple factories', function () {
    it('should create multiple <style> element', function () {
      cssx.factory().build();
      cssx.factory().build();
      cssx.build();
      cssx.build();
      cssx.build();
      expect(document.createElement).to.be.calledThrice;
    });
  });
  describe('when we add a rule', function () {
    it('should build the css correctly', function () {
      cssx.add('body', { 'margin': '10px' });
      expect(cssx.build()).to.be.equal('body{margin:10px;}');
    });
  });
  describe('when we have nested rules', function () {
    it('should build the css correctly', function () {
      cssx
      .add('body')
        .add('h1', { 'padding': '.1em' })
          .add('small', { 'font-size': '0.3em' });
      expect(cssx.build()).to.be.equal('body h1{padding:.1em;}body h1 small{font-size:0.3em;}');
    });
  });
  describe('when we add multiple rules to same scope', function () {
    it('should build the css correctly', function () {
      var body = cssx.add('body', { 'a': 1 });
      cssx.add('footer', { 'b': 2 })
      body.add('h1', { 'c': 3 });
      body.add('p', { 'd': 4 });
      expect(cssx.build()).to.be.equal('body{a:1;}body h1{c:3;}body p{d:4;}footer{b:2;}');
    });
  });

});