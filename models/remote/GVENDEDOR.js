var Sequelize = require('sequelize');
var DBRemote = require('./index');

const GVENDEDOR = DBRemote.define('GVENDEDOR', {
  GLBIdentificadorUnoVendedor: Sequelize.STRING,
  GLBSucursalVendedor: Sequelize.STRING,
  GLBIdentificadorDosVendedor: Sequelize.STRING,
  GLBFechaIngresoVendedor: Sequelize.STRING,
  GLBFechaRetiroVendedor: Sequelize.STRING,
  GLBCodigoComisionVentasVendedor: Sequelize.STRING,
  GLBCodigoComisionRecaudosVendedor: Sequelize.STRING,
  GLBComentariosVendedor: Sequelize.STRING
  },
  {
    indexes:[{primary: true, name: "PK_GVENDEDOR", fields: ["GLBIdentificadorUnoVendedor", "GLBSucursalVendedor"]}],
    timestamps: false,
    freezeTableName: true,
    schema: 'dbo'
  }
);

GVENDEDOR.removeAttribute('id');

module.exports = GVENDEDOR;
