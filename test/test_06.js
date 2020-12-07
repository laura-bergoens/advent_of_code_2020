const chai = require('chai');
const expect = chai.expect;
const { jobAny, jobEvery } = require('../source/06/code/job');

describe('06', () => {
    describe('jobAny', () => {
        it('should return sum of distinct questions answered yes by anyone for each group', () => {
            // given
            const rawInput = 'abc\n' +
                '\n' +
                'a\n' +
                'b\n' +
                'c\n' +
                '\n' +
                'ab\n' +
                'ac\n' +
                '\n' +
                'a\n' +
                'a\n' +
                'a\n' +
                'a\n' +
                '\n' +
                'b';

            // when
            const result = jobAny(rawInput);

            // then
            expect(result).to.equal(11);
        });
    });
    describe('jobEvery', () => {
        it('should return sum of distinct questions answered yes by everyone for each group', () => {
            // given
            const rawInput = 'abc\n' +
                '\n' +
                'a\n' +
                'b\n' +
                'c\n' +
                '\n' +
                'ab\n' +
                'ac\n' +
                '\n' +
                'a\n' +
                'a\n' +
                'a\n' +
                'a\n' +
                '\n' +
                'b';

            // when
            const result = jobEvery(rawInput);

            // then
            expect(result).to.equal(6);
        });
    });
});
