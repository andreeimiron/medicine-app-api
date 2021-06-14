module.exports = (sequelize, DataTypes) => {
  const Consultation = sequelize.define('Consultation', {
    diagnostic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: true,
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

  Consultation.associate = (models) => {
    Consultation.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Consultation;
};
