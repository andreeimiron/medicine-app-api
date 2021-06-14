const genderTypes = {
  MALE: 'masculin',
  FEMALE: 'feminin',
};

const bloodTypes = {
  O_POSITIVE: 'O-',
  O_NEGATIVE: 'O+',
  A_POSITIVE: 'A-',
  A_NEGATIVE: 'A+',
  B_POSITIVE: 'B-',
  B_NEGATIVE: 'B+',
  AB_POSITIVE: 'AB-',
  AB_NEGATIVE: 'AB+',
};

const insuredTypes = {
  EMPLOYED: 'salariat',
  CO_INSURED: 'coasigurat',
  FREELANCE: 'liber profesionist',
  CHILD: 'copil (<18 ani)',
  STUDENT: 'elev/student (18-26 ani)',
  PREGNANT: 'gravida/lehuza',
  RETIRED: 'pensionar',
  VETERAN: 'veteran',
  REVOLUTIONIST: 'revolutionar',
  HANDICAP: 'handicap',
  SOCIAL_AID: 'ajutor social',
  UNEMPLOYED: 'somaj',
  CE: 'card european (CE)',
  AGREEMENTS: 'acorduri internationale',
  OTHERS: 'alte categorii',
};

const birthTypes = {
  NATURAL: 'naturala',
  CESAREAN: 'cezariana',
};

const requestTypes = {
  PRESCRIPTION: 'reteta medicala',
  CERTIFICATE: 'adeverinta medicala',
  REFERRAL: 'bilet de trimitere',
  SICK_LEAVE: 'concediu medical',
};

const roleTypes = {
  DOCTOR: 'medic',
  PATIENT: 'pacient',
};

module.exports = {
  genderTypes,
  bloodTypes,
  insuredTypes,
  birthTypes,
  requestTypes,
  roleTypes,
};
