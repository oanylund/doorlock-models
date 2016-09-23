module.exports = (sequelize, DataTypes) => {
  var ProductDetail = sequelize.define('productDetail', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    productEarnings: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
        notEmpty: true
      }
    },
    unitsSold: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
        notEmpty: true
      }
    }
  });

  return ProductDetail;
}
