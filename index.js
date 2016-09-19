var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var sequelize = (dbName, dbUser, dbPassword, dbHost, dbPort) => {
  return new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql',
    host: dbHost || '127.0.0.1',
    port: dbPort || 3306,
    logging: null,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      timestamps: false
    }
  });
}


var db = {}

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
    db[model.name] = model
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
