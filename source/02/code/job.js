const _ = require('lodash');

class PasswordItemFirstPolicy {
  constructor({ limitCount, letter, password }) {
    const limits = limitCount.split('-');
    this.lowLimit = parseInt(limits[0]);
    this.highLimit = parseInt(limits[1]);
    this.letter = letter.replace(':', '');
    this.password = password;
  }

  isValid() {
    const countFnc = (str, ch) => _.countBy(str)[ch] || 0;
    const letterCount = countFnc(this.password, this.letter);
    return letterCount >= this.lowLimit && letterCount <= this.highLimit;
  }
}

class PasswordItemSecondPolicy {
  constructor({ positions, letter, password }) {
    const positionParts = positions.split('-');
    this.positionOne = parseInt(positionParts[0]) - 1;
    this.positionTwo = parseInt(positionParts[1]) - 1;
    this.letter = letter.replace(':', '');
    this.password = password;
  }

  isValid() {
    const letterInPositionOne = this.password[this.positionOne] === this.letter;
    const letterInPositionTwo = this.password[this.positionTwo] === this.letter;
    return letterInPositionOne ? !letterInPositionTwo : letterInPositionTwo;
  }
}

function jobFirstPolicy(rawInput) {
  const lines = rawInput.split('\n');
  const passwordItems = [];
  for (const line of lines) {
    if (!_.isEmpty(line)) {
      const portions = line.split(' ');
      passwordItems.push(new PasswordItemFirstPolicy({
        limitCount: portions[0],
        letter: portions[1],
        password: portions[2],
      }));
    }
  }

  return _.filter(passwordItems, (pwd) => pwd.isValid()).length;
}

function jobSecondPolicy(rawInput) {
  const lines = rawInput.split('\n');
  const passwordItems = [];
  for (const line of lines) {
    if (!_.isEmpty(line)) {
      const portions = line.split(' ');
      passwordItems.push(new PasswordItemSecondPolicy({
        positions: portions[0],
        letter: portions[1],
        password: portions[2],
      }));
    }
  }

  return _.filter(passwordItems, (pwd) => pwd.isValid()).length;
}

module.exports = {
  jobFirstPolicy,
  jobSecondPolicy,
};

