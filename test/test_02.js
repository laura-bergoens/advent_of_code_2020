const chai = require('chai');
const expect = chai.expect;
const { jobFirstPolicy, jobSecondPolicy } = require('../source/02/code/job');

describe('02', () => {
  describe('jobFirstPolicy', () => {
    it('should return the count of valid passwords', () => {
      // given
      const rawInput = '1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc';

      // when
      const countValidPasswords = jobFirstPolicy(rawInput);

      // then
      expect(countValidPasswords).to.equal(2);
    });
  });
  describe('jobSecondPolicy', () => {
    it('should return the count of valid passwords', () => {
      // given
      const rawInput = '1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc';

      // when
      const countValidPasswords = jobSecondPolicy(rawInput);

      // then
      expect(countValidPasswords).to.equal(1);
    });
  });
});
