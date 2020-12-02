const _ = require('lodash');

/**
 * Recursive algorithm.
 * This exercise consists in fact in summing/multiplying numbers within the same
 * original list X times with a goal.
 *
 * Part 1 consists in comparing results of summing/multiplying numbers in the provided list with itself (so two times)
 * Part 2 is the same as Part 1, but with 3 times the list itself.
 *
 * With this reasoning, we can group the work by pairs : for example with X as 8, there are two ways to proceed.
 *
 * Linear/naive : we can clone the list 8 times : L1 - L2 - L3 - L4 - L5 - L6 - L7 - L8 and then merge lists as follow :
 *            - L1 with L2 -> L12
 *            - L12 with L3 -> L123
 *            - L123 with L4 ... until the end
 *
 * Smart/recursive : we can deduce that doing it 8 times, is like doing it twice for 4 times, then merge the two results.
 * That way, it's half the pain.
 * Rule of thumbs :
 *    - if X is pair, result is merging two times the list for (X/2).
 *      Working with X as 8 is like working with the merged list for 4, and merge with itself.
 *    - if X is odd, result is merging the original list with (X-1).
 *      Working with X as 5 is like merging list for X as 4 and X as 1 (original list)
 */

class ListItem {
  constructor({ number, product }) {
    this.number = number;
    this.product = product;
  }

  static sum(i1, i2) {
    return i1.number + i2.number;
  }

  static multiply(i1, i2) {
    return i1.product * i2.product;
  }

  static buildFrom(i1, i2) {
    return new ListItem({
      number: ListItem.sum(i1, i2),
      product: ListItem.multiply(i1, i2),
    });
  }
}

function _mergeTwoLists(l1, l2, max) {
  const newList = [];
  for (const i1 of l1) {
    for (const i2 of l2) {
      const sum = ListItem.sum(i1, i2);
      if (sum <= max) {
        newList.push(ListItem.buildFrom(i1, i2));
      }
    }
  }
  return _.sortBy(newList, 'number');
}

function _findSolution(list, sumGoal) {
  const listItemSolution = _.find(list, (i) => i.number === sumGoal);
  if (listItemSolution) return listItemSolution.product;
  return null;
}

function _numbersStringToOrderedIntegersArray(rawInput) {
  const numbersSorted = _.sortBy(rawInput.split('\n').map((n) => parseInt(n)));
  return _.map(numbersSorted, (n) => new ListItem({ number: n, product: n * 1 }));
}

const mergedLists = {};
function _mergePairList(list, times, goal) {
  if (times in mergedLists) {
    return mergedLists[times];
  }

  // origins
  if (times === 2) {
    mergedLists[2] = _mergeTwoLists(list, list, goal);
    return mergedLists[2];
  }
  if (times === 1) {
    mergedLists[1] = list;
    return mergedLists[1];
  }

  if (times % 2 === 0) {
    const subList = _mergePairList(list, times / 2, goal);
    mergedLists[times] = _mergeTwoLists(subList, subList, goal);
  } else {
    const listA = _mergePairList(list, times - 1, goal);
    const listB = _mergePairList(list, 1, goal);
    mergedLists[times] = _mergeTwoLists(listA, listB, goal);
  }

  return mergedLists[times];
}

function jobX(rawInput, times, goal) {
  const originSortedList = _numbersStringToOrderedIntegersArray(rawInput);
  const mergedList = _mergePairList(originSortedList, times, goal);
  return _findSolution(mergedList, goal);
}

module.exports = {
  jobX,
};

