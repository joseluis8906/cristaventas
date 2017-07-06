var Sequelize = require('sequelize');
var DBLocal = require('./index');

const Inventario = DBLocal.define('Inventario', {
    Id: {type: Sequelize.INTEGER, primaryKey: true},
    Referencia: {type: Sequelize.STRING, unique: true},
    Nombre: Sequelize.STRING,
    Existencia: Sequelize.INTEGER
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

module.exports = Inventario;
