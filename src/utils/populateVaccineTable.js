const { Vaccine } = require('../models');
const { nbOfVaccines, nbOfUsers } = require('./constants');
const { randomDate, randomNumber } = require('./utils');

const populateVaccineTable = async () => {
  const indexes = [...Array(nbOfVaccines).keys()];

  await Promise.all(indexes.map(async (index) => {
    await Vaccine.create({
      type: 'Vaccin Antigripal',
      description: `PFZ-${index + 1}`,
      date: randomDate(new Date('2000-01-01'), new Date()),
      userId: randomNumber(3, nbOfUsers / 4),
    });
  }));

};

module.exports = populateVaccineTable;
