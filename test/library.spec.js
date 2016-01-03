import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import cssx from '../src';

chai.expect();
chai.use(sinonChai);

const expect = chai.expect;

describe('Given the cssx library', function () {

  describe('when we have multiple compilers', function () {
    it('should return a new id every time', () => {
      var result = [
        cssx.compile()(), 
        cssx.compile()(), 
        cssx.compile()(), 
        cssx.compile()(), 
        cssx.compile()()
      ];
      var status = false;

      for (let i=0; i<result.length; i++) {
        for(let j=i+1; j<result.length; j++) {
          if (result[i] === result[j]) status = true;
        }
      }
      expect(status).to.be.false;
    });
  });

  describe('when we have only one compiler', function () {
    it('should return the same id every time', () => {
      var styles = cssx.compile();
      expect([styles(), styles(), styles()]).to.be.deep.equal([styles(), styles(), styles()]);
    });
  });  

});