const chai = require('chai');
const expect = chai.expect;
const { job, job2 } = require('../source/10/code/job');

describe('10', () => {
    describe('job', () => {
        it('should return ok', () => {
            // given
            const rawInput = '28\n' +
                '33\n' +
                '18\n' +
                '42\n' +
                '31\n' +
                '14\n' +
                '46\n' +
                '20\n' +
                '48\n' +
                '47\n' +
                '24\n' +
                '23\n' +
                '49\n' +
                '45\n' +
                '19\n' +
                '38\n' +
                '39\n' +
                '11\n' +
                '1\n' +
                '32\n' +
                '25\n' +
                '35\n' +
                '8\n' +
                '17\n' +
                '7\n' +
                '9\n' +
                '4\n' +
                '2\n' +
                '34\n' +
                '10\n' +
                '3';

            // when
            const result = job(rawInput);

            // then
            expect(result).to.equal(220);
        });
    });
    describe('job2', () => {
        it('should return ok', () => {
            // given
            const rawInput = '28\n' +
                '33\n' +
                '18\n' +
                '42\n' +
                '31\n' +
                '14\n' +
                '46\n' +
                '20\n' +
                '48\n' +
                '47\n' +
                '24\n' +
                '23\n' +
                '49\n' +
                '45\n' +
                '19\n' +
                '38\n' +
                '39\n' +
                '11\n' +
                '1\n' +
                '32\n' +
                '25\n' +
                '35\n' +
                '8\n' +
                '17\n' +
                '7\n' +
                '9\n' +
                '4\n' +
                '2\n' +
                '34\n' +
                '10\n' +
                '3';

            // when
            const result = job2(rawInput);

            // then
            expect(result).to.equal(19208);
        });
    });
});
