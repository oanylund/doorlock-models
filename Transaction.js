module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM('purchase', 'deposit', 'withdrawal'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        notEmpty: true
      }
    },
    old_balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        notEmpty: true
      }
    }
  },
  {
    classMethods: {
      associate: (models) => {
        Transaction.belongsTo(models.User);
        Transaction.belongsTo(models.Product);
      }
    }
  });

  return Transaction;
}
