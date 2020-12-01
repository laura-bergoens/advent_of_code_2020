const _ = require('lodash');

function _compute22(numbers) {
  for (const littleN of numbers) {
    for (const bigN of numbers) {
      if (bigN !== littleN) {
        const sum = littleN + bigN;
        if (sum === 2020) {
          return littleN * bigN;
        }
        if (sum > 2020) {
          break;
        }
      }
    }
  }
}

function _compute33(numbers) {
  for (const n1 of numbers) {
    for (const n2 of numbers) {
      if ((n1 + n2) > 2020) {
        break;
      }
      if (n2 !== n1) {
        for (const n3 of numbers) {
          if (n3 !== n1) {
            const sum = n1 + n2 + n3;
            if (sum === 2020) {
              return n1 * n2 * n3;
            }
            if (sum > 2020) {
              break;
            }
          }
        }
      }
    }
  }
}

function job1(rawInput) {
  let rawNumbers = rawInput.split('\n');
  rawNumbers = _.map(rawNumbers, (n) => parseInt(n));
  const rawTruc = _.sortBy(rawNumbers);
  return _compute22(rawTruc);
}

function job2(rawInput) {
  let rawNumbers = rawInput.split('\n');
  rawNumbers = _.map(rawNumbers, (n) => parseInt(n));
  rawNumbers.sort((na, nb) => {
    if (na > nb) return 1;
    if (na < nb) return -1;
    if (na === nb) return 0;
  });
  return _compute33(rawNumbers);
}

module.exports = {
  job1,
  job2,
};
