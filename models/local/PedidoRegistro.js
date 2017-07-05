var Sequelize = require('sequelize');
var DB = require('./index');
var Pedido = require('./Pedido');
var Producto = require('./Producto');

const PedidoRegistro = DB.define('PedidoRegistro', {
    Item: {type: Sequelize.STRING, primaryKey: true},
    Cantidad: Sequelize.INTEGER,
    ProductoId: {type: Sequelize.INTEGER, references: Producto, referencesKey: "Id"},
    Subtotal: Sequelize.DECIMAL,
    PedidoId: {type: Sequelize.INTEGER, references: Pedido, referencesKey: 'Id'}
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

PedidoRegistro.belongsTo(Producto);
Producto.hasMany(PedidoRegistro);

PedidoRegistro.belongsTo(Pedido);
Pedido.hasMany(PedidoRegistro);

module.exports = PedidoRegistro;
