const chai = require('chai');
const expect = chai.expect;
const { job } = require('../source/10/code/job');

describe('sample', () => {
    describe('job', () => {
        it('should return ok', () => {
            // when
            const result = job();

            // then
            expect(result).to.equal('ok');
        });
    });
});
