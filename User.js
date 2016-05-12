module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    privateEmail: {
      type: DataTypes.STRING(30),
      validate: {
        isEmail: true
      }
    },
    mobile: {
      type: DataTypes.STRING(10),
      validate: {
        isInt: true
      }
    },
    studentCardId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    }
  });

  return User;
}
