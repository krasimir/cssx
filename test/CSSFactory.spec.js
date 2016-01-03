import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { rule, generate } from '../src/CSSFactory';

chai.expect();
chai.use(sinonChai);

const expect = chai.expect;

describe('Given the CSSFactory', function () {

  describe('when we have nested rules', function () {

    it('should return rules with valid selectors', () => {
      var b = rule('b');
      var span = rule('span', null, b);
      var input = rule('input');
      var r = rule('.content', null, [span, input]);

      generate(r);

      expect(b.selector).to.be.equal('.content span b');
      expect(span.selector).to.be.equal('.content span');
      expect(input.selector).to.be.equal('.content input');
      expect(r.selector).to.be.equal('.content');
    });

    it('should produce a valid css', function () {
      var b = rule('b', { fontSize: '20px' });
      var span = rule('span', null, b);
      var r = rule('p', { margin: 0, padding: 0 }, span);
      expect(generate(r)).to.be.equal('p{margin:0;padding:0;}p span b{fontSize:20px;}');
    });
  });
  

});