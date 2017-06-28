var Sequelize = require('sequelize');
var db = require('./index');
var Producto = require('./Producto');

const Inventario = db.define('Inventario', {
    ProductoId: {type: Sequelize.INTEGER, primaryKey: true, references: Producto, referencesKey: 'Id'},
    CantidadDisponible: Sequelize.INTEGER,
    CantidadVendida: Sequelize.INTEGER
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

Inventario.belongsTo(Producto);
Producto.hasOne(Inventario);

module.exports = Inventario;
