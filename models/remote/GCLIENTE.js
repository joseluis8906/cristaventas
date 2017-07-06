var Sequelize = require('sequelize');
var DBRemote = require('./index');

const GCLIENTE = DBRemote.define('GCLIENTE', {
  GLBIdentificadorUnoCliente: Sequelize.STRING,
  GLBSucursalCliente: Sequelize.STRING,
  GLBIdentificadorDosCliente: Sequelize.STRING,
  GLBFechaUltimoNegocioCliente: Sequelize.STRING,
  GLBFechaUltimoPagoCliente: Sequelize.STRING,
  GLBSaldoAnteriorCliente: Sequelize.DECIMAL,
  GLBDebitosCliente: Sequelize.DECIMAL,
  GLBCreditosCliente: Sequelize.DECIMAL,
  GLBCodigoZonaCliente: Sequelize.STRING,
  GLBCodigoCumplimientoCliente: Sequelize.STRING,
  GLBCodigoClasificacionCliente: Sequelize.STRING,
  GLBPorcentajeInteresesMoraCliente: Sequelize.DECIMAL,
  GLBFechaIngresoCliente: Sequelize.STRING,
  GLBFechaRetiroCliente: Sequelize.STRING,
  GLBCodigoTipoFinanciacionCliente: Sequelize.STRING,
  GLBPlazoCliente: Sequelize.INTEGER,
  GLBCupoCreditoCliente: Sequelize.DECIMAL,
  GLBPorDescComercialUnoCliente: Sequelize.DECIMAL,
  GLBPorDescComercialDosCliente: Sequelize.DECIMAL,
  GLBPorDescComercialTresCliente: Sequelize.DECIMAL,
  GLBPorDescFinancierolUnoCliente: Sequelize.DECIMAL,
  GLBPorDescFinancieroDosCliente: Sequelize.DECIMAL,
  GLBPorDescFinancieroTresCliente: Sequelize.DECIMAL,
  GLBDiasDescFinancieroUnoCliente: Sequelize.DECIMAL,
  GLBDiasDescFinancieroDosCliente: Sequelize.DECIMAL,
  GLBDiasDescFinancieroTresCliente: Sequelize.DECIMAL,
  GLBAcumuladorBrutoPeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorE1PeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorE2PeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorE3PeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorD1PeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorD2PeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorD3PeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorDescuentoCarteraPeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorIvaPeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorReteFuentePeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorReteIVAPeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorReteICAPeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorImpoConsumoPeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorIVABimestreCliente: Sequelize.DECIMAL,
  GLBAcumuladorReteIvaBimestreCliente: Sequelize.DECIMAL,
  GLBAcumuladoReteICABimestreCliente: Sequelize.DECIMAL,
  GLBAcumuladorBrutoAnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorE1AnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorE2AnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorE3AnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorD1AnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorD2AnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorD3AnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorDescuentoCarteraAnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorIvaAnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorReteFuenteAnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorReteIVAAnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorReteICAAnoCliente: Sequelize.DECIMAL,
  GLBAcumuladorImpoConsumoAnoCliente: Sequelize.DECIMAL,
  GLBIdentificadorUnoVendedorCliente: Sequelize.STRING,
  GLBSucursalVendedorCliente: Sequelize.STRING,
  GLBIdentificadorDosVendedorCliente: Sequelize.STRING,
  GLBComentariosCliente: Sequelize.STRING,
  GLBCodigoListaPrecios: Sequelize.STRING,
  GLBBloqueoVentasCliente: Sequelize.INTEGER,
  GLBDiasBloqueoCliente: Sequelize.INTEGER,
  GLBCodigoReteCREECliente: Sequelize.STRING,
  GLBAcumuladorReteCREEPeriodoCliente: Sequelize.DECIMAL,
  GLBAcumuladorReteCREEAnoCliente: Sequelize.DECIMAL
  },
  {
    indexes:[{name: "PK_GCLIENTE", fields: ["GLBIdentificadorUnoCliente", "GLBSucursalCliente"], primaryKey: true}],
    timestamps: false,
    freezeTableName: true,
    schema: 'dbo'
  }
);

GCLIENTE.removeAttribute('id');

module.exports = GCLIENTE;
