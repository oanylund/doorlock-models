var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  logging: null,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var db = {}

// Utility function to uppercase first letter in string
function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Load all models
fs
  .readdirSync(__dirname)
  .filter( (file) => {
    return (file.indexOf('.') !== 0)
    && (file !== 'index.js')
    && (file !== 'package.json')
    && (file !== 'node_modules')
  })
  .forEach( (file) => {
    var model = sequelize.import(path.join(__dirname, file))
    db[titleCase(model.name)] = model
  })

// Run associates
Object.keys(db).forEach( (modelName) => {
  if('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
