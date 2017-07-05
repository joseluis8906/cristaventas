var Sequelize = require('sequelize');
var DB = require('./index');

const GREFERENCIA = DB.define('GREFERENCIA', {
  GLBCodigoReferencia: {type: Sequelize.STRING, primaryKey: true},
  GLBNombreReferencia: Sequelize.STRING,
  GLBUnidadDeEmpaqueReferencia: Sequelize.STRING,
  GLBUnidadesPorEmpaqueReferencia: Sequelize.DECIMAL,
  GLBCodigoTarifaIvaReferencia: Sequelize.STRING,
  GLBCodigoReteFuenteReferencia: Sequelize.STRING,
  GLBUnidadesReservadasReferencia: Sequelize.DECIMAL,
  GLBPluReferencia: Sequelize.STRING,
  GLBDiasVencimientoReferencia: Sequelize.INTEGER,
  GLBCodigoTipoReferenciaReferencia: Sequelize.STRING,
  GLBCodigoLineaReferencia: Sequelize.STRING,
  GLBDiasGarantiaVentaReferencia: Sequelize.INTEGER,
  GLBCodigoFichaTecnicaReferencia: Sequelize.STRING,
  GLBImpuestoAlConsumoReferencia: Sequelize.DECIMAL,
  GLBLocalizacionReferencia: Sequelize.STRING,
  GLBDescuento1Referencia: Sequelize.DECIMAL,
  GLBDescuento2Referencia: Sequelize.DECIMAL,
  GLBDescuento3Referencia: Sequelize.DECIMAL,
  GLBPuntoReordenReferencia: Sequelize.DECIMAL,
  GLBFechaUltOrdenCompraReferencia: Sequelize.STRING,
  GLBTiempoFijoReferencia: Sequelize.INTEGER,
  GLBCantidadFijaReferencia: Sequelize.DECIMAL,
  GLBCantidadPedidaUnidadesPeriodoReferencia: Sequelize.DECIMAL,
  GLBCantidadPedidaPesosPeriodoReferencia: Sequelize.DECIMAL,
  GLBCantidadPedidaUnidadesAcumuladoReferencia: Sequelize.DECIMAL,
  GLBCantidadPedidaPesosAcumuladoReferencia: Sequelize.DECIMAL,
  GLBComentarioReferencia: Sequelize.STRING,
  GLBStockSeguridadReferencia: Sequelize.DECIMAL,
  GLBMetodoControlInventarioReferencia: STRING,
  GLBTieneDespieceReferencia: Sequelize.INTEGER,
  GLBManejaSerialReferencia: Sequelize.INTEGER,
  GLBUnidaddeMedidaReferencia: Sequelize.STRING,
  GLBTipoProductoReferencia: Sequelize.STRING,
  GLBCicloDeProduccionReferencia: Sequelize.INTEGER,
  GLBControlLotesReferencia: Sequelize.INTEGER,
  GLBControlDiasVencimiento: Sequelize.INTEGER,
  GLBFacturarPorValorNeto: Sequelize.INTEGER
  },
  {
    timestamps: false,
    freezeTableName: true,
    schema: 'dbo'
  }
);

module.exports = GREFERENCIA;
