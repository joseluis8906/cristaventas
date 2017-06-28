var Sequelize = require('sequelize');
/*const db = new Sequelize('gis', 'unixjs', 'K3J9 8LMN 02F3 B3LW',
{
    host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})*/

const db = new Sequelize('sqlite://models/cristaleria.sqlite');

db.authenticate()
.then(() => {
  console.log ('Connection is established successfully.');
})
.catch(err => {
  console.error ('Unable to connect to the database.', err);
});

module.exports = db;
