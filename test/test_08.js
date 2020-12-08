const chai = require('chai');
const expect = chai.expect;
const { job } = require('../source/08/code/job');

describe('08', () => {
    describe('job', () => {
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
            const result = job(rawInput);

            // then
            expect(result).to.equal(5);
        });
    });
});
