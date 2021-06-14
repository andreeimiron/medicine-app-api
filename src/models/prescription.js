module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define('Prescription', {
    diagnostic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicamentation: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Prescription.associate = (models) => {
    Prescription.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Prescription;
};
