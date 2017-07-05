var Sequelize = require('sequelize');
var DB = require('./index');

const Cliente = DB.define('Cliente', {
    Id: {type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true},
    Nit: {type: Sequelize.STRING, unique: true},
    Nombre: Sequelize.STRING,
    Direccion: Sequelize.STRING,
    Telefono: Sequelize.STRING,
    Descuento: Sequelize.DECIMAL
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

module.exports = Cliente;
