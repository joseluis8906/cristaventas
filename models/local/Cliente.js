var Sequelize = require('sequelize');
var DBLocal = require('./index');

const Cliente = DBLocal.define('Cliente', {
    Id: {type: Sequelize.INTEGER, primaryKey: true},
    Nit: {type: Sequelize.STRING, unique: true},
    Sucursal: Sequelize.STRING,
    Codigo: Sequelize.STRING,
    Nombre: Sequelize.STRING,
    Direccion: Sequelize.STRING,
    Telefono1: Sequelize.STRING,
    Telefono2: Sequelize.STRING,
    Descuento: Sequelize.DECIMAL,
    Plazo: Sequelize.INTEGER,
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

module.exports = Cliente;
