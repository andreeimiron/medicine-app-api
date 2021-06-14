const { History } = require('../models');
const { nbOfHistories, nbOfUsers } = require('./constants');
const { randomDate, randomNumber } = require('./utils');

const populateHistoryTable = async () => {
  const indexes = [...Array(nbOfHistories).keys()];

  await Promise.all(indexes.map(async (index) => {
    await History.create({
      diagnostic: `Diagnostic ${index + 1}`,
      date: randomDate(new Date('2000-01-01'), new Date()),
      userId: randomNumber(3, nbOfUsers / 4),
    });
  }));

};

module.exports = populateHistoryTable;
