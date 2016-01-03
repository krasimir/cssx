import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import cssx from '../src';

chai.expect();
chai.use(sinonChai);

const expect = chai.expect;

describe('Given the cssx library', function () {

  describe('when we call cssx function', function () {
    it('should return a new id if we don\'t provide one', () => {
      var result = [cssx(), cssx(), cssx(), cssx(), cssx()];
      var status = false;

      for (let i=0; i<result.length; i++) {
        for(let j=i+1; j<result.length; j++) {
          if (result[i] === result[j]) status = true;
        }
      }
      expect(status).to.be.false;
    });
  });
  

});