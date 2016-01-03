import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.expect();
chai.use(sinonChai);

const expect = chai.expect;

describe('Given the library', function () {
  it ('should work', () => {
    expect(1).to.be.equal(1);
  })
});