var Sequelize = require('sequelize');
var DBRemote = require('./index');

const Producto = DBRemote.define('Producto', {
    Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    Referencia: {type: Sequelize.STRING, unique: true},
    Nombre: Sequelize.STRING,
    UnidadDeMedida: Sequelize.STRING,
    UnidadPorEmpaque: Sequelize.INTEGER,
    ModeloContable: Sequelize.STRING,
    Linea: Sequelize.STRING,
    PrecioBase: Sequelize.DECIMAL,
    Iva: Sequelize.DECIMAL,
    LimiteIva: Sequelize.DECIMAL,
    PromocionDelProveedor: Sequelize.DECIMAL,
    PromocionDelMes: Sequelize.DECIMAL,
    Existencia: Sequelize.INTEGER,
    FechaUltimaCompra: Sequelize.DATEONLY,
    FechaUltimaVenta: Sequelize.DATEONLY,
    Observaciones: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    //schema: 'Auth'
  }
);

module.exports = Producto;
