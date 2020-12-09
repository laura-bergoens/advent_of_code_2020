const chai = require('chai');
const expect = chai.expect;
const { jobFindWeak, jobEncryptionWeakness } = require('../source/09/code/job');

describe('09', () => {
    describe('jobFindWeak', () => {
        it('should return weak number', () => {
            // given
            const rawInput = '35\n' +
                '20\n' +
                '15\n' +
                '25\n' +
                '47\n' +
                '40\n' +
                '62\n' +
                '55\n' +
                '65\n' +
                '95\n' +
                '102\n' +
                '117\n' +
                '150\n' +
                '182\n' +
                '127\n' +
                '219\n' +
                '299\n' +
                '277\n' +
                '309\n' +
                '576';

            // when
            const result = jobFindWeak(rawInput, 5);

            // then
            expect(result).to.equal(127);
        });
    });
    describe('jobEncryptionWeakness', () => {
        it('should return encryption from weak', () => {
            // given
            const rawInput = '35\n' +
                '20\n' +
                '15\n' +
                '25\n' +
                '47\n' +
                '40\n' +
                '62\n' +
                '55\n' +
                '65\n' +
                '95\n' +
                '102\n' +
                '117\n' +
                '150\n' +
                '182\n' +
                '127\n' +
                '219\n' +
                '299\n' +
                '277\n' +
                '309\n' +
                '576';

            // when
            const result = jobEncryptionWeakness(rawInput, 5);

            // then
            expect(result).to.equal(62);
        });
    });
});
