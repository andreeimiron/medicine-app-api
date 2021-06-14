const populateCertificateTable = require('./populateCertificateTable');
const populateConsultationTable = require('./populateConsultationTable');
const populateHistoryTable = require('./populateHistoryTable');
const populatePrescriptionTable = require('./populatePrescriptionTable');
const populateReferralTable = require('./populateReferralTable');
const populateRequestTable = require('./populateRequestTable');
const populateSickLeaveTable = require('./populateSickLeaveTable');
const populateUserTable = require('./populateUserTable');
const populateVaccineTable = require('./populateVaccineTable');

const populateDb = async () => {
  console.log('> Populate User Table');
  await populateUserTable();
  console.log('> Populate Certificate Table');
  await populateCertificateTable();
  console.log('> Populate Consultation Table');
  await populateConsultationTable();
  console.log('> Populate History Table');
  await populateHistoryTable();
  console.log('> Populate Prescription Table');
  await populatePrescriptionTable();
  console.log('> Populate Referral Table');
  await populateReferralTable();
  console.log('> Populate Request Table');
  await populateRequestTable();
  console.log('> Populate SickLeave Table');
  await populateSickLeaveTable();
  console.log('> Populate Vaccine Table');
  await populateVaccineTable();
  console.log('> Database populated successfully');
};

module.exports = populateDb;
