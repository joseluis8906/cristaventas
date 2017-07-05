var Sequelize = require('sequelize');
var DB = require('./index');

const GIMPUESTOSYRETENCIONES = DB.define('GIMPUESTOSYRETENCIONES', {
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

module.exports = GIMPUESTOSYRETENCIONES;
