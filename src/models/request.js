const { requestTypes } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    type: {
      type: DataTypes.ENUM(requestTypes.PRESCRIPTION, requestTypes.CERTIFICATE, requestTypes.REFERRAL, requestTypes.SICK_LEAVE),
      defaultValue: requestTypes.PRESCRIPTION,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    solved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Request.associate = (models) => {
    Request.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Request;
};
