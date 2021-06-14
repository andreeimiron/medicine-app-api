const bcrypt = require('bcrypt');

const { genderTypes, bloodTypes, birthTypes, insuredTypes, roleTypes } = require('../constants');

const encryptPassword = (user) => {
  if (user.changed('password')) {
    return bcrypt.hash(user.password, 10)
      .then((encryptedPassword) => { user.password = encryptedPassword; });
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(roleTypes.PATIENT, roleTypes.DOCTOR),
      defaultValue: roleTypes.PATIENT,
    },
    cnp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    birthPlace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM(genderTypes.MALE, genderTypes.FEMALE),
      defaultValue: genderTypes.MALE,
    },
    motherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergencyContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergencyContactPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    insuredCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentMedication: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    bloodType: {
      type: DataTypes.ENUM(bloodTypes.O_NEGATIVE, bloodTypes.O_POSITIVE, bloodTypes.A_NEGATIVE, bloodTypes.A_POSITIVE,
        bloodTypes.B_NEGATIVE, bloodTypes.B_POSITIVE, bloodTypes.AB_NEGATIVE, bloodTypes.AB_POSITIVE),
      defaultValue: bloodTypes.O_NEGATIVE,
    },
    allergies: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    insuredType: {
      type: DataTypes.ENUM(insuredTypes.EMPLOYED, insuredTypes.CO_INSURED, insuredTypes.FREELANCE, insuredTypes.CHILD,
        insuredTypes.STUDENT, insuredTypes.PREGNANT, insuredTypes.RETIRED, insuredTypes.VETERAN,
        insuredTypes.REVOLUTIONIST, insuredTypes.HANDICAP, insuredTypes.SOCIAL_AID, insuredTypes.UNEMPLOYED,
        insuredTypes.CE, insuredTypes.AGREEMENTS, insuredTypes.OTHERS),
      defaultValue: insuredTypes.EMPLOYED,
    },
    birthType: {
      type: DataTypes.ENUM(birthTypes.NATURAL, birthTypes.CESAREAN),
      defaultValue: birthTypes.NATURAL,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lastPeriod: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: encryptPassword,
      beforeUpdate: encryptPassword,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Vaccine, { foreignKey: 'userId' });
    User.hasMany(models.History, { foreignKey: 'userId' });
    User.hasMany(models.Prescription, { foreignKey: 'userId' });
    User.hasMany(models.Referral, { foreignKey: 'userId' });
    User.hasMany(models.SickLeave, { foreignKey: 'userId' });
    User.hasMany(models.Certificate, { foreignKey: 'userId' });
    User.hasMany(models.Consultation, { foreignKey: 'userId' });
    User.hasMany(models.Request, { foreignKey: 'userId' });
    User.hasOne(models.User, { foreignKey: 'doctorId' });
    User.belongsTo(models.User, { foreignKey: 'doctorId' });
  };

  return User;
};
