var Sequelize = require('sequelize');
var DBRemote = require('./index');

const GIMPUESTOSYRETENCIONES = DBRemote.define('GIMPUESTOSYRETENCIONES', {
  GLBCodigoImpuestosYRetenciones: {type: Sequelize.STRING, primaryKey: true},
  GLBNombreImpuestosYRetenciones: Sequelize.STRING,
  GLBIdImpuestosYRetenciones: Sequelize.STRING,
  GLBPorcentajeImpuestosYRetenciones: Sequelize.DECIMAL,
  GLBLimiteInferiorImpuestosYRetenciones: Sequelize.DECIMAL,
  GLBPorcentajeIVADescontable: Sequelize.DECIMAL,
  GLBCodActEconomImpuestosYRetenciones: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    schema: 'dbo'
  }
);

GIMPUESTOSYRETENCIONES.removeAttribute('id');

module.exports = GIMPUESTOSYRETENCIONES;
