var Sequelize = require('sequelize');
var DBRemote = require('./index');

const Vendedor = DBRemote.define('Vendedor', {
    Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    Cedula: {type: Sequelize.STRING, unique: true},
    Sucursal: Sequelize.STRING,
    Codigo: Sequelize.STRING,
    Nombre: Sequelize.STRING,
    PrefijoPedido: Sequelize.STRING,
    CodigoTipoDocumento: Sequelize.STRING,
    Clave: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

module.exports = Vendedor;
