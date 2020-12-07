const _ = require('lodash');

class BagRules {
  constructor() {
    this.bagsByColor = {};
  }

  parseRule(rawRule) {
    const baseBagRule = this.parseBaseBagRule(rawRule);
    this.parseSubBagsRule(baseBagRule, rawRule);
  }

  parseBaseBagRule(rawRule) {
    const baseBagRawRule = rawRule.split('contain')[0].split(' ');
    const bagColor = [baseBagRawRule[0], baseBagRawRule[1]].join('');
    if (!(bagColor in this.bagsByColor)) {
      this.bagsByColor[bagColor] = this.createBagRule(bagColor);
    }

    return this.bagsByColor[bagColor];
  }

  parseSubBagsRule(baseBagRule, rawRule) {
    const otherRawRules = rawRule.split('contain').slice(1).join('').split('bag');
    for (const subRawRule of otherRawRules) {
      const regexp = /.*([0-9]+ [a-zA-Z]+ [a-zA-Z]+)/g;
      const subRuleMatches = [...subRawRule.matchAll(regexp)];
      for (const match of subRuleMatches) {
        const pureSubRawRule = match[1].split(' ');
        const subBagColor = [pureSubRawRule[1], pureSubRawRule[2]].join('');
        const count = pureSubRawRule[0];
        baseBagRule.subBagCountByColor[subBagColor] = parseInt(count);
      }
    }
  }

  createBagRule(color) {
    return new BagRule(color);
  }

  countRelatedTo(color) {
    return _.filter(this.bagsByColor, (bagRule) => bagRule.isRelatedTo(color, this.bagsByColor)).length;
  }

  countSubBagsFor(color) {
    const colorBagRule = _.find(this.bagsByColor, (bagRule) => bagRule.color === color);
    return colorBagRule.countSubBags(this.bagsByColor);
  }
}

let bagRules = new BagRules();
class BagRule {
  constructor(color) {
    this.color = color;
    this.subBagCountByColor = {};
  }

  isRelatedTo(color, bagRulesByColor) {
    if (this.color === color) {
      return false;
    }
    if (_.isEmpty(this.subBagCountByColor)) {
      return false;
    }

    return _.some(Object.keys(this.subBagCountByColor), (subBagColor) => {
      if (subBagColor === color) return true;
      const subBagRule = _.find(bagRulesByColor, (bagRule) => bagRule.color === subBagColor);
      return subBagRule.isRelatedTo(color, bagRulesByColor);
    });
  }

  countSubBags(bagRulesByColor) {
    let currentCount = 0;
    if (_.isEmpty(this.subBagCountByColor)) {
      return currentCount;
    }

    for (const [subBagColor, count] of Object.entries(this.subBagCountByColor)) {
      const subBagRule = _.find(bagRulesByColor, (bagRule) => {
        return bagRule.color === subBagColor;
      });
      currentCount = currentCount + count + (count * subBagRule.countSubBags(bagRulesByColor));
    }

    return currentCount;
  }
}

function jobRelated(rawInput) {
  const rawRules = rawInput.split('\n').filter((line) => line.length > 0);

  rawRules.map((rawRule) => {
    bagRules.parseRule(rawRule);
  });

  const count = bagRules.countRelatedTo('shinygold');
  bagRules = new BagRules();
  return count;
}

function jobCount(rawInput) {
  const rawRules = rawInput.split('\n').filter((line) => line.length > 0);

  rawRules.map((rawRule) => {
    bagRules.parseRule(rawRule);
  });

  const count = bagRules.countSubBagsFor('shinygold');
  bagRules = new BagRules();
  return count;
}

module.exports = {
  jobRelated,
  jobCount,
};
