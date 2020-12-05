const _ = require('lodash');

class Seat {
  constructor({ binaryPass }) {
    this.binaryPass = binaryPass;
    this.row = -1;
    this.column = -1;
    this.seatId =  this._computeSeatId();
  }

  _parseRow() {
    const rowInfo = this.binaryPass.substring(0, 7);
    const maxDigit = 6;
    let ongoingRowCalculation = 0;
    for (const [key, value] of Object.entries(rowInfo)) {
      const currentMask = Math.pow(2, maxDigit - key);
      if (value === 'B') {
        ongoingRowCalculation = ongoingRowCalculation + currentMask;
      }
    }

    return ongoingRowCalculation;
  }

  _parseColumn() {
    const columnInfo = this.binaryPass.substring(7);
    const maxDigit = 2;
    let ongoingColumnCalculation = 0;
    for (const [key, value] of Object.entries(columnInfo)) {
      const currentMask = Math.pow(2, maxDigit - key);
      if (value === 'R') {
        ongoingColumnCalculation = ongoingColumnCalculation + currentMask;
      }
    }

    return ongoingColumnCalculation;
  }

  _computeSeatId() {
    this.row = this._parseRow();
    this.column = this._parseColumn();
    return (8 * this.row) + this.column;
  }
}

function jobGetHigher(rawInput) {
  const seatsData = rawInput.split('\n');
  const seats = _.map(seatsData, (binaryPass) => new Seat({ binaryPass }));
  if (_.isEmpty(seats)) return null;
  return _.orderBy(seats, ['seatId'], ['desc'])[0].seatId;
}

function jobFindAvailable(rawInput) {
  let seatsData = rawInput.split('\n');
  seatsData = _.filter(seatsData, (seatData) => seatData.length > 0);
  const seats = _.map(seatsData, (binaryPass) => new Seat({ binaryPass }));
  if (_.isEmpty(seats)) return null;
  const seatIdsAsc = _.orderBy(seats, ['seatId'], ['asc']);
  const seatIdsDesc = _.orderBy(seats, ['seatId'], ['desc']);
  const lowerSeatId = seatIdsAsc[0].seatId;
  const higherSeatId = seatIdsDesc[0].seatId;
  for (let i = lowerSeatId + 1; i < higherSeatId; ++i) {
    const isTaken = _.find(seatIdsAsc, (seat) => seat.seatId === i);
    if (!isTaken) {
      return i;
    }
  }
  return null;
}

module.exports = {
  jobGetHigher,
  jobFindAvailable,
};

