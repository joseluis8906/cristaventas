var Sequelize = require('sequelize');

const DB = new Sequelize('mssql://DISTRIBUIDORAPOPULAR:dcp18922444@186.115.13.181:1433/C01');

DB.authenticate()
.then(() => {
  console.log ('DB Remote Connection is established successfully.');
})
.catch(err => {
  console.error ('DB Remote Unable to connect to the database.', err);
});

module.exports = DB;
