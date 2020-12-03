const _ = require('lodash');

class Map {
  constructor({ pattern }) {
    this.pattern = pattern;
    this.patternXLoop = pattern[0].length;
  }

  applySlope({ slopeX, slopeY }) {
    let encounteredTrees = 0;
    let tempX = 0;
    let tempY = 0;
    let currentLine = this.pattern[tempY];
    while (currentLine) {
      encounteredTrees = currentLine[tempX] === '#' ? encounteredTrees + 1 : encounteredTrees;
      tempX = (tempX + slopeX) % this.patternXLoop;
      tempY = tempY + slopeY;
      currentLine = this.pattern[tempY];
    }
    return encounteredTrees;
  }
}

function job(rawInput, slopes) {
  const pattern = rawInput.split('\n');
  const map = new Map({ pattern });
  const treesPerSlope = _.map(slopes, (slope) => {
    return map.applySlope(slope);
  });

  return _.reduce(treesPerSlope, (acc, value) => {
    return acc * value;
  }, 1);
}

module.exports = {
  job,
};

