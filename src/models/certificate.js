module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    diagnostic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recomandation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseReason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ableFor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    conclusion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Certificate.associate = (models) => {
    Certificate.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Certificate;
};
