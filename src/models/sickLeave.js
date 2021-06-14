module.exports = (sequelize, DataTypes) => {
  const SickLeave = sequelize.define('SickLeave', {
    diagnostic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  SickLeave.associate = (models) => {
    SickLeave.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return SickLeave;
};
