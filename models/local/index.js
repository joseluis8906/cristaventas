var Sequelize = require('sequelize');

const DB = new Sequelize('sqlite://models/cristaleria.sqlite');

DB.authenticate()
.then(() => {
  console.log ('DB Local Connection is established successfully.');
})
.catch(err => {
  console.error ('DB Local Unable to connect to the database.', err);
});

module.exports = DB;
