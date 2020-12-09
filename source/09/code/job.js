const _ = require('lodash');

function findWeakIndexNumber(numbers, preambleLength) {
  let currentIndex = preambleLength;
  while(currentIndex < numbers.length) {
    const startIndexOperands = currentIndex - preambleLength;
    const operands = numbers.slice(startIndexOperands, currentIndex);
    const currentValue = numbers[currentIndex];
    const exists = sumOperandsExistForValue(operands, currentValue);
    if(exists) {
      return currentIndex;
    }
    ++currentIndex;
  }

  return null;
}

function sumOperandsExistForValue(operands, currentValue) {
  for(let i = 0; i < operands.length; ++i) {
    const operandA = operands[i];
    for(let j = 0; j < operands.length; ++j) {
      const operandB = operands[j];
      if(j !== i && (operandA + operandB === currentValue)) return null;
    }
  }
  return currentValue;
}

function findOkSumIndex(startIndexSum, weakNumber) {
  for(const [startIndex, sum] of Object.entries(startIndexSum)) {
    if(sum === weakNumber) {
      return startIndex;
    }
  }

  return null;
}

function computeSolution(array) {
  return _.min(array) + _.max(array);
}

module.exports = {
  jobFindWeak(rawInput, preambleLength) {
    const numbers = rawInput.split('\n').filter((number) => number.length > 0).map((number) => parseInt(number));
    const weakIndexNumber = findWeakIndexNumber(numbers, preambleLength);
    if(weakIndexNumber) return numbers[weakIndexNumber];
    return null;
  },


  jobEncryptionWeakness(rawInput, preambleLength) {
    const numbers = rawInput.split('\n').filter((number) => number.length > 0).map((number) => parseInt(number));
    const weakIndexNumber = findWeakIndexNumber(numbers, preambleLength);
    if(!weakIndexNumber) return null;
    const weakNumber = numbers[weakIndexNumber];
    const startIndexSums = {};
    for(let i = 0; i < numbers.length; ++i) {
      _.each(startIndexSums, (sum, startIndex) => {
        startIndexSums[startIndex] = sum + numbers[i];
      });
      startIndexSums[i] = numbers[i];
      const indexOfOkSum = findOkSumIndex(startIndexSums, weakNumber);
      if(indexOfOkSum) return computeSolution(numbers.slice(indexOfOkSum, i + 1));
    }

    return null;
  },

};
