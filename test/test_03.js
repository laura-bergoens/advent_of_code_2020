const chai = require('chai');
const expect = chai.expect;
const { job } = require('../source/03/code/job');

describe('03', () => {
  describe('job', () => {
    it('should return the right product of encountered trees by slopes', () => {
      // given
      const rawInput =    '..##.......\n' +
                                '#...#...#..\n' +
                                '.#....#..#.\n' +
                                '..#.#...#.#\n' +
                                '.#...##..#.\n' +
                                '..#.##.....\n' +
                                '.#.#.#....#\n' +
                                '.#........#\n' +
                                '#.##...#...\n' +
                                '#...##....#\n' +
                                '.#..#...#.#';

      // when
      const result = job(rawInput, [
        { slopeX: 1, slopeY: 1 },
        { slopeX: 3, slopeY: 1 },
        { slopeX: 5, slopeY: 1 },
        { slopeX: 7, slopeY: 1 },
        { slopeX: 1, slopeY: 2 },
      ]);

      // then
      expect(result).to.equal(336);
    });
  });
});
