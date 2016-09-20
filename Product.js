module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    retailPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        notEmpty: true
      }
    },
    costPrice: {
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
        Product.hasMany(models.Transaction);
        Product.hasOne(models.ProductDetail, { onDelete: 'CASCADE' })
      }
    }
  });

  return Product;
}
