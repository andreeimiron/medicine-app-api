const { Certificate } = require('../models');
const { nbOfCertificates, nbOfUsers } = require('./constants');
const { randomDate, randomNumber } = require('./utils');

const populateCertificateTable = async () => {
  const indexes = [...Array(nbOfCertificates).keys()];

  await Promise.all(indexes.map(async (index) => {
    const date = randomDate(new Date('2000-01-01'), new Date());

    await Certificate.create({
      diagnostic: `Diagnostic ${index + 1}`,
      recomandation: 'Recomandare',
      releaseReason: 'Motivul eliberarii',
      startDate: date,
      endDate: randomDate(date, new Date()),
      ableFor: 'Activitate sportiva',
      result: randomNumber(0, 1) ? 'Analize bune' : null,
      conclusion: randomNumber(0, 1) ? 'Apt' : null,
      userId: randomNumber(3, nbOfUsers / 4),
    });
  }));
};

module.exports = populateCertificateTable;
