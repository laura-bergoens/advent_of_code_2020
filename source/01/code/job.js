const _ = require('lodash');

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

function _computeListFromLists(l1, l2, max) {
  const newList = [];
  for (const i1 of l1) {
    for (const i2 of l2) {
      const sum = ListItem.sum(i1, i2);
      if (sum <= max) {
        newList.push(ListItem.buildFrom(i1, i2));
      }
    }
  }
  return newList;
}

function _findSolution(list, sumGoal) {
  const listItemSolution = _.find(list, (i) => i.number === sumGoal);
  return listItemSolution.product;
}

function _numbersStringToOrderedIntegersArray(rawInput) {
  const numbersSorted = _.sortBy(rawInput.split('\n').map((n) => parseInt(n)));
  return _.map(numbersSorted, (n) => new ListItem({ number: n, product: n*1 }))
}

function _mergeLists(lists, goal) {
  return _.reduce(lists, (acc, list)  => {
    if(_.isEmpty(acc)) {
      return list;
    }
    return _computeListFromLists(acc, list, goal);
  }, []);
}

function jobX(rawInput, times, goal) {
  const originSortedList = _numbersStringToOrderedIntegersArray(rawInput);
  const originalLists = [];
  for(const time of new Array(times)) {
    originalLists.push(_.cloneDeep(originSortedList));
  }
  const finalMergedList = _mergeLists(originalLists, goal);
  return _findSolution(finalMergedList, goal);
}

module.exports = {
  jobX,
};

