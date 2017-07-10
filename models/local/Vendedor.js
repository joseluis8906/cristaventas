var Sequelize = require('sequelize');
var DBLocal = require('./index');

const Vendedor = DBLocal.define('Vendedor', {
    Id: {type: Sequelize.INTEGER, primaryKey: true},
    Cedula: Sequelize.STRING,
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