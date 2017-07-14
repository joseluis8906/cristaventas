var Sequelize = require('sequelize');
var DBLocal = require('./index');

const Config1 = DBLocal.define('Config1', {
    Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    Clave: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

module.exports = Config1;
