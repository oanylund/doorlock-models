module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('transaction', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM('purchase', 'deposit', 'withdrawal'),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['purchase', 'deposit', 'withdrawal']],
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
    oldBalance: {
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
        Transaction.belongsTo(models.User, { onDelete: 'CASCADE' });
        Transaction.belongsTo(models.Product);
      }
    }
  });

  return Transaction;
}
