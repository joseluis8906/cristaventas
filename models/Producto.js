var Sequelize = require('sequelize');
var db = require('./index');

const Producto = db.define('Producto', {
    Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    Codigo: {type: Sequelize.STRING, unique: true},
    Nombre: Sequelize.STRING,
    DescuentoProveedor: Sequelize.DECIMAL,
    PrecioUnitario: Sequelize.DECIMAL,
    Iva: Sequelize.DECIMAL,
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

module.exports = Producto;
