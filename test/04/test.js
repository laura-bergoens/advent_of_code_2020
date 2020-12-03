const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-sorted'));
const { job } = require('../../source/04/code/job');

describe('04', () => {
    describe('job', () => {
        it('should return ok', () => {
            // given
            const rawInput = 'raw input';

            // when
            const result = job(rawInput);

            // then
            expect(result).to.equal('ok');
        });
    });
});
