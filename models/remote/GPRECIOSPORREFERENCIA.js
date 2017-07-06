var Sequelize = require('sequelize');
var DBRemote = require('./index');

const GPRECIOSPORREFERENCIA = DBRemote.define('GPRECIOSPORREFERENCIA', {
  GLBCodigoReferenciaPreciosPorReferencia: Sequelize.STRING,
  GLBCodigoListapreciosPreciosPorReferencia: Sequelize.STRING,
  GLBValorUnitarioPreciosPorReferencia: Sequelize.DECIMAL,
  GLBUtilidadMinimaPreciosPorReferencia: Sequelize.INTEGER
  },
  {
    indexes:[{primary: true, name: "PK_GPRECIOSPORREFERENCIA", fields: ["GLBCodigoReferenciaPreciosPorReferencia", "GLBCodigoListapreciosPreciosPorReferencia"]}],
    timestamps: false,
    freezeTableName: true,
    schema: 'dbo'
  }
);

GPRECIOSPORREFERENCIA.removeAttribute('id');

module.exports = GPRECIOSPORREFERENCIA;
