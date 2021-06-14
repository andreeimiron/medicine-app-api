const { Referral } = require('../models');
const { nbOfReferrals, nbOfUsers } = require('./constants');
const { randomDate, randomNumber } = require('./utils');

const populateReferralTable = async () => {
  const indexes = [...Array(nbOfReferrals).keys()];

  await Promise.all(indexes.map(async (index) => {
    await Referral.create({
      priority: randomNumber(0, 1) ? true : false,
      diagnostic: `Diagnostic ${index + 1}`,
      releaseDate: randomDate(new Date('2000-01-01'), new Date()),
      investigation: ['Investigatia 1', 'Investigatia 2'],
      userId: randomNumber(3, nbOfUsers / 4),
    });
  }));

};

module.exports = populateReferralTable;
