const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-sorted'));
const { job } = require('../source/08/code/job');

describe('08', () => {
    describe('job', () => {
        it('should return ok', () => {
            // when
            const result = job();

            // then
            expect(result).to.equal('ok');
        });
    });
});
