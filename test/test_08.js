const chai = require('chai');
const expect = chai.expect;
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
