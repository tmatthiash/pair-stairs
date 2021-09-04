const dbConfig = require("../configs/db.configs");

const Sequelize = require("sequelize");
console.log(dbConfig.USER)
console.log(dbConfig.DB)
console.log(dbConfig.PASSWORD)

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pairmatrix = require("./pairmatrix.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.pairset = require("./pairSet.model.js")(sequelize, Sequelize);

db.user.belongsTo(db.pairmatrix);
db.pairmatrix.hasMany(db.user);

db.pairset.belongsTo(db.pairmatrix);
db.pairmatrix.hasMany(db.pairset);

module.exports = db;