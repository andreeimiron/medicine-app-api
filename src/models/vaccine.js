module.exports = (sequelize, DataTypes) => {
  const Vaccine = sequelize.define('Vaccine', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Vaccine.associate = (models) => {
    Vaccine.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Vaccine;
};
