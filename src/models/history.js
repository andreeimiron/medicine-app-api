module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    diagnostic: {
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

  History.associate = (models) => {
    History.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return History;
};
