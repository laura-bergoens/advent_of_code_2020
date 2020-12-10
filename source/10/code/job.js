const _ = require('lodash');
const { print } = require('../../helper');

function countEligibleBranches(orderedJoltages, parentJoltage, goalJoltage) {
  if(parentJoltage === goalJoltage) return 1;
  const eligibleJoltages = _.filter(orderedJoltages, (joltage) => joltage - parentJoltage <= 3);
  if(_.isEmpty(eligibleJoltages)) return 0;

  const descEligibleJoltages = _.orderBy(eligibleJoltages).reverse();
  const remember = {
    3: 0,
    2: 0,
    1: 0,
  };
  for(const descEligibleJoltage of descEligibleJoltages) {
    if(descEligibleJoltage === parentJoltage + 3) {
      const nextJoltages = _.filter(orderedJoltages, (joltage) => joltage > descEligibleJoltage);
      remember[3] = countEligibleBranches(nextJoltages, descEligibleJoltage, goalJoltage);
    }
    if(descEligibleJoltage === parentJoltage + 2) {
      const nextJoltages = _.filter(orderedJoltages, (joltage) => joltage > (descEligibleJoltage + 1));
      remember[2] = countEligibleBranches(nextJoltages, descEligibleJoltage, goalJoltage) + remember[3];
    }
    if(descEligibleJoltage === parentJoltage + 1) {
      const nextJoltages = _.filter(orderedJoltages, (joltage) => joltage > (descEligibleJoltage + 2));
      remember[1] = countEligibleBranches(nextJoltages, descEligibleJoltage, goalJoltage) + remember[3] + remember[2];
    }
  }

  return remember[3] + remember[2] + remember[1];
}

module.exports = {
  job(rawInput) {
    const adaptersRaw = rawInput.split('\n').filter((number) => number.length > 0).map((number) => parseInt(number));
    adaptersRaw.push(_.max(adaptersRaw) + 3);
    adaptersRaw.unshift(0);
    const orderedJoltages = _.orderBy(adaptersRaw);
    const joltageSpaces = {};
    for (let i = 0; i < orderedJoltages.length; ++i) {
      const space = orderedJoltages[i] - orderedJoltages[i - 1];
      if(!(space in joltageSpaces)) {
        joltageSpaces[space] = 0;
      }
      ++joltageSpaces[space];
    }
    return joltageSpaces[3] * joltageSpaces[1];
  },

  job2(rawInput) {
    const adaptersRaw = rawInput.split('\n').filter((number) => number.length > 0).map((number) => parseInt(number));
    adaptersRaw.push(_.max(adaptersRaw) + 3);
    const orderedJoltages = _.orderBy(adaptersRaw);
    return countEligibleBranches(orderedJoltages, 0, _.last(orderedJoltages));
  },
};
