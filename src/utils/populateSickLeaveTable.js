const { SickLeave } = require('../models');
const { nbOfSickLeaves, nbOfUsers } = require('./constants');
const { randomDate, randomNumber } = require('./utils');

const populateSickLeaveTable = async () => {
  const indexes = [...Array(nbOfSickLeaves).keys()];
  const date = randomDate(new Date('2000-01-01'), new Date());

  await Promise.all(indexes.map(async (index) => {
    await SickLeave.create({
      diagnostic: `Diagnostic ${index + 1}`,
      startDate: date,
      endDate: randomDate(date, new Date()),
      userId: randomNumber(3, nbOfUsers / 4),
    });
  }));

};

module.exports = populateSickLeaveTable;
