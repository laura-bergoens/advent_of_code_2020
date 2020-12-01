const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-sorted'));
const { job1, job2 } = require('../../source/01/code/job');

describe('01', () => {
  describe('job1', () => {
    it('should return multiplication of two numbers whose sum equals 2020 from the input numbers as string', () => {
      // given
      const rawInput = '2\n754\n2018\n1248\n7821';

      // when
      const solution = job1(rawInput);

      // then
      expect(solution).to.equal(2018 * 2);
    });
  });

  describe('job2', () => {
    it('should return multiplication of 3 numbers whose sum equals 2020 from the input numbers as string', () => {
      // given
      const rawInput = '2\n754\n2018\n1248\n7821\n1264';

      // when
      const solution = job2(rawInput);

      // then
      expect(solution).to.equal(754 * 2 * 1264);
    });
  });
});
