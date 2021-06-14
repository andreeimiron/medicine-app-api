const { Prescription } = require('../models');
const { nbOfPrescriptions, nbOfUsers } = require('./constants');
const { randomDate, randomNumber } = require('./utils');

const populatePrescriptionTable = async () => {
  const indexes = [...Array(nbOfPrescriptions).keys()];

  await Promise.all(indexes.map(async (index) => {
    await Prescription.create({
      diagnostic: `Diagnostic ${index + 1}`,
      releaseDate: randomDate(new Date('2000-01-01'), new Date()),
      medicamentation: ['Algocalmin - fiole DS. i.v. 10x1/zi'],
      userId: randomNumber(3, nbOfUsers / 4),
    });
  }));

};

module.exports = populatePrescriptionTable;
