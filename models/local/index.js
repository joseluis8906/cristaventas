var Sequelize = require('sequelize');

const DBLocal = new Sequelize('postgres://unixjs:K3J9 8LMN 02F3 B3LW@127.0.0.1:5432/dcp');

DBLocal.authenticate()
.then(() => {
  console.log ('DB Local Connection is established successfully.');
})
.catch(err => {
  console.error ('DB Local Unable to connect to the database.', err);
});

module.exports = DBLocal;
