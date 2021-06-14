const { Consultation } = require('../models');
const { nbOfConsultations, nbOfUsers } = require('./constants');
const { randomDate, randomNumber } = require('./utils');

const populateConsultationTable = async () => {
  const indexes = [...Array(nbOfConsultations).keys()];

  await Promise.all(indexes.map(async (index) => {
    await Consultation.create({
      diagnostic: `Diagnostic ${index + 1}`,
      observations: randomNumber(0, 1) ? 'Observatii' : null,
      date: randomDate(new Date('2000-01-01'), new Date()),
      userId: randomNumber(3, nbOfUsers / 4),
    });
  }));
};

module.exports = populateConsultationTable;
