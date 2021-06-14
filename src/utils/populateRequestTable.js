const { Request } = require('../models');
const { nbOfRequests, nbOfUsers } = require('./constants');
const { randomDate, randomNumber } = require('./utils');
const { requestTypes } = require('../constants');

const populateRequestTable = async () => {
  const indexes = [...Array(nbOfRequests).keys()];
  const types = [requestTypes.PRESCRIPTION, requestTypes.CERTIFICATE, requestTypes.REFERRAL, requestTypes.SICK_LEAVE];

  await Promise.all(indexes.map(async (index) => {
    await Request.create({
      type: types[randomNumber(0, 3)],
      reason: `Motiv justificat ${index + 1}`,
      date: randomDate(new Date('2000-01-01'), new Date()),
      solved: randomNumber(0, 1) ? true : false,
      userId: randomNumber(3, nbOfUsers / 4),
    });
  }));

};

module.exports = populateRequestTable;
