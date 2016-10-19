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
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Påkrevd felt' }
      }
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Påkrevd felt' }
      }
    },
    userName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Påkrevd felt' },
        is: {
          args: /^[0-9A-ZÆØÅ]+$/i, //is alphanumeric with norwegian locale
          msg: 'Kun et ord med bokstaver og tall tillatt'
        },
      }
    },
	  graduationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: { msg: 'Påkrevd felt' },
        isYYYY: function(val) {
          var value = val + '';
          if( value.length != 4 || !/^[-+]?[0-9]+$/.test(value) ) {
            throw new Error('Kun tall med fire siffer (YYYY)');
          }
        }
      }
    },
    privateEmail: {
      type: DataTypes.STRING(30),
      validate: {
        isEmail: { msg: 'Ikke gyldig e-postadresse' }
      }
    },
    mobile: {
      type: DataTypes.STRING(10),
      validate: {
        isInt: { msg: 'Kun tall' }
      }
    },
    studentCardId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: { msg: 'Kun et alfanumerisk ord'}
      }
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        isDecimal: { msg: 'Kun nummer'}
      }
    }
  },
  {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Transaction, { onDelete: 'CASCADE' })
      }
    }
  });

  return User;
}
