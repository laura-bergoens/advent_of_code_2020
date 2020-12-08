const chai = require('chai');
const expect = chai.expect;
const { jobOnlyOnce, jobReplace } = require('../source/08/code/job');

describe('08', () => {
    describe('jobOnlyOnce', () => {
        it('should return ok', () => {
            // given
            const rawInput = 'nop +0\n' +
                'acc +1\n' +
                'jmp +4\n' +
                'acc +3\n' +
                'jmp -3\n' +
                'acc -99\n' +
                'acc +1\n' +
                'jmp -4\n' +
                'acc +6';

            // when
            const result = jobOnlyOnce(rawInput);

            // then
            expect(result).to.equal(5);
        });
    });
    describe('jobReplace', () => {
        it('should return ok', () => {
            // given
            const rawInput = 'nop +0\n' +
                'acc +1\n' +
                'jmp +4\n' +
                'acc +3\n' +
                'jmp -3\n' +
                'acc -99\n' +
                'acc +1\n' +
                'jmp -4\n' +
                'acc +6';

            // when
            const result = jobReplace(rawInput);

            // then
            expect(result).to.equal(8);
        });
    });
});
