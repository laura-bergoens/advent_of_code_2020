const chai = require('chai');
const expect = chai.expect;
const { job } = require('../source/11/code/job');

describe('11', () => {
    describe('job', () => {
        it('should return ok', () => {
            // when
            const result = job();

            // then
            expect(result).to.equal('ok');
        });
    });
});
