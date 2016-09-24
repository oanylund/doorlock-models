module.exports = (sequelize, DataTypes) => {
  var Slot = sequelize.define('slot', {
    // From left to right when standing in front of machine
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        isDecimal: true,
        notEmpty: true
      }
    },
  },
  {
    classMethods: {
      associate: (models) => {
        Slot.belongsTo(models.Product);
      }
    }
  });

  return Slot;
}
