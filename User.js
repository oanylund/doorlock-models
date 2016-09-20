module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
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
	  graduationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
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
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isDecimal: true
      }
    }
  },
  {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Transaction)
      }
    }
  });

  return User;
}
