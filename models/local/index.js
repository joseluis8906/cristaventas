var Sequelize = require('sequelize');

const DBLocal = new Sequelize('sqlite://models/local/cristaleria.sqlite');

DBLocal.authenticate()
.then(() => {
  console.log ('DB Local Connection is established successfully.');
})
.catch(err => {
  console.error ('DB Local Unable to connect to the database.', err);
});

module.exports = DBLocal;
