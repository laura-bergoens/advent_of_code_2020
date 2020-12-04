const _ = require('lodash');

class Passport {
  constructor(passportData) {
    this.attributes = {};
    const items = passportData.split(' ');
    const sortedItems = _.orderBy(items);
    for (const item of sortedItems) {
      const itemDetails = item.split(':');
      this.attributes[itemDetails[0]] = itemDetails[1];
    }
  }

  isBirthYearValid() {
    return this.attributes.byr
        && this.attributes.byr.toString().length === 4
        && parseInt(this.attributes.byr) <= 2002
        && parseInt(this.attributes.byr) >= 1920;
  }

  isIssueYearValid() {
    return this.attributes.iyr
        && this.attributes.iyr.toString().length === 4
        && parseInt(this.attributes.iyr) <= 2020
        && parseInt(this.attributes.iyr) >= 2010;
  }

  isExpirationYearValid() {
    return this.attributes.eyr
        && this.attributes.eyr.toString().length === 4
        && parseInt(this.attributes.eyr) <= 2030
        && parseInt(this.attributes.eyr) >= 2020;
  }

  isHeightValid() {
    let isValid = false;
    if (this.attributes.hgt) {
      const value = this.attributes.hgt;
      if (_.includes(value, 'cm')) {
        const heightVal = value.split('cm')[0];
        isValid = parseInt(heightVal) <= 193
            && parseInt(heightVal) >= 150;
      }
      if (_.includes(value, 'in')) {
        const heightVal = value.split('in')[0];
        isValid = parseInt(heightVal) <= 76
                  && parseInt(heightVal) >= 59;
      }
    }
    return isValid;
  }

  isHairColorValid() {
    let isValid = false;
    if (this.attributes.hcl) {
      const regex = /^#[a-f0-9]{6}$/g;
      isValid = Boolean(this.attributes.hcl.match(regex));
    }
    return isValid;
  }

  isEyeColorValid() {
    let isValid = false;
    if (this.attributes.ecl) {
      isValid = ['amb', 'blu', 'brn' ,'gry', 'grn', 'hzl', 'oth'].includes(this.attributes.ecl);
    }
    return isValid;
  }

  isPassportIdValid() {
    let isValid = false;
    if (this.attributes.pid) {
      const regex = /^[0-9]{9}$/g;
      isValid = Boolean(this.attributes.pid.match(regex));
    }
    return isValid;
  }

  isValidLight() {
    return 'byr' in this.attributes
    && 'iyr' in this.attributes
    && 'eyr' in this.attributes
    && 'hgt' in this.attributes
    && 'hcl' in this.attributes
    && 'ecl' in this.attributes
    && 'pid' in this.attributes;
  }

  isValidStrong() {
    return this.isBirthYearValid() && this.isIssueYearValid() && this.isExpirationYearValid()
            && this.isHeightValid() && this.isHairColorValid() && this.isEyeColorValid() && this.isPassportIdValid();
  }
}

function _preparePassports(rawInput) {
  const passportsRaw = rawInput.split('\n\n');
  return _.map(passportsRaw, (passportRaw) => {
    let passportData = passportRaw;
    passportData = passportData.replace('\n', ' '); // my replace would not work for all occurrences....
    passportData = passportData.replace('\n', ' ');
    passportData = passportData.replace('\n', ' ');
    passportData = passportData.replace('\n', ' ');
    passportData = passportData.replace('\n', ' ');
    passportData = passportData.replace('\n', ' ');
    passportData = passportData.replace('\n', ' ');
    passportData = passportData.replace('\n', ' ');
    passportData = passportData.replace('\n', ' ');
    passportData = passportData.replace('\n', ' ');
    return new Passport(passportData);
  });
}

function jobLight(rawInput) {
  const passports = _preparePassports(rawInput);
  const validPassports = _.filter(passports, (passport) => passport.isValidLight());
  return validPassports.length;
}

function jobStrong(rawInput) {
  const passports = _preparePassports(rawInput);
  const validPassports = _.filter(passports, (passport) => passport.isValidStrong());
  return validPassports.length;
}

module.exports = {
  jobLight,
  jobStrong,
};

