module.exports = (sequelize, DataTypes) => {
  const Referral = sequelize.define('Referral', {
    priority: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    diagnostic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    investigation: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Referral.associate = (models) => {
    Referral.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Referral;
};
