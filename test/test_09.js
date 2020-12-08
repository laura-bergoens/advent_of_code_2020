const chai = require('chai');
const expect = chai.expect;
const { job } = require('../source/samples/job');

describe('09', () => {
    describe('job', () => {
        it('should return ok', () => {
            // when
            const result = job();

            // then
            expect(result).to.equal('ok');
        });
    });
});
