const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const { jobGetHigher, jobFindAvailable } = require('../source/05/code/job');

describe('05', () => {
    describe('jobGetHigher', () => {
        it('should return the highest boarding seat id', () => {
            // given
            const rawInput = 'FBFBBFFRLR\n' +
                'BFFFBBFRRR\n' +
                'FFFBBBFRRR\n' +
                'BBFFBBFRLL'
            // when
            const result = jobGetHigher(rawInput);

            // then
            expect(result).to.equal(820);
        });
    });

    describe('jobFindAvailable', () => {
        it('should return the available boarding seat id', () => {
            // given
            const INPUT = `${__dirname}/../source/05/input/input.txt`;
            const rawInput = fs.readFileSync(INPUT, 'utf8');

            // when
            const result = jobFindAvailable(rawInput);

            // then
            expect(result).to.equal(739);
        });
    });
});
