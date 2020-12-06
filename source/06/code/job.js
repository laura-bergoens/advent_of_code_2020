const _ = require('lodash');

class GroupAnswers {
  constructor(groupAnswersRaw) {
    this.raw = groupAnswersRaw;
  }

  countDistinctAnyYesAnswer() {
    const allAnswers = this.raw.split('\n').filter((line) => line.length > 0);
    const joinedAnswersAsStr = allAnswers.join('');
    return _.uniq(joinedAnswersAsStr).length;
  }

  countDistinctEveryYesAnswer() {
    const allAnswers = this.raw.split('\n').filter((line) => line.length > 0);
    const numberOfPpl = allAnswers.length;
    const joinedAnswersAsStr = allAnswers.join('');
    const eachCharacterInArray = [...joinedAnswersAsStr];
    const occurrencesCountForEachCharacter = _.countBy(eachCharacterInArray);
    let countEvery = 0;
    for (const countOcc of Object.values(occurrencesCountForEachCharacter)) {
      if (countOcc === numberOfPpl) ++countEvery;
    }
    return countEvery;
  }
}

function jobAny(rawInput) {
  const data = rawInput.split(/\n\s*\n/);
  const groupAnswers = _.map(data, (item) => new GroupAnswers(item));
  return _.reduce(groupAnswers, (acc, groupAnswer) => {
    return acc + groupAnswer.countDistinctAnyYesAnswer();
  }, 0);
}
function jobEvery(rawInput) {
  const data = rawInput.split(/\n\s*\n/);
  const groupAnswers = _.map(data, (item) => new GroupAnswers(item));
  return _.reduce(groupAnswers, (acc, groupAnswer) => {
    return acc + groupAnswer.countDistinctEveryYesAnswer();
  }, 0);
}

module.exports = {
  jobAny,
  jobEvery,
};

