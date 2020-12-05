const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-sorted'));
const { job } = require('../source/06/code/job');

describe('06', () => {
    describe('job', () => {
        it('should return ok', () => {
            // when
            const result = job();

            // then
            expect(result).to.equal('ok');
        });
    });
});
