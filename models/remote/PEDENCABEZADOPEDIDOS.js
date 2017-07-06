var Sequelize = require('sequelize');
var DBRemote = require('./index');

const PEDENCABEZADOPEDIDOS = DBRemote.define('PEDENCABEZADOPEDIDOS', {
  PEDPrefijoPedidoEncabezadoPedidos: Sequelize.STRING,
  PEDNumeroPedidoEncabezadoPedidos: Sequelize.STRING,
  PEDIdDocumentoEncabezadoPedidos: Sequelize.STRING,
  PEDCodigoTipoDocumentoEncabezadoPedidos: Sequelize.STRING,
  PEDFechaPedidoEncabezadoPedidos: Sequelize.STRING,
  PEDFechaEntregaEncabezadoPedidos: Sequelize.STRING,
  PEDIdentificadorDosClienteEncabezadoPedidos: Sequelize.STRING,
  PEDIdentificadorUnoClienteEncabezadoPedidos: Sequelize.STRING,
  PEDSucursalClienteEncabezadoPedidos: Sequelize.STRING,
  PEDIdentificadorUnoVendedorEncabezadoPedidos: Sequelize.STRING,
  PEDSucursalVendedorEncabezadoPedidos: Sequelize.STRING,
  PEDIdentificadorDosVendedorEncabezadoPedidos: Sequelize.STRING,
  PEDPlazoEncabezadoPedidos: Sequelize.INTEGER,
  PEDCodigoMonedaEncabezadoPedidos: Sequelize.STRING,
  PEDTasaCambioEncabezadoPedidos: Sequelize.DECIMAL,
  PEDEstadoEncabezadoPedidos: Sequelize.STRING,
  PEDPorcDescComercialUnoEncabezadoPedidos: Sequelize.DECIMAL,
  PEDPorcDescComercialDosEncabezadoPedidos: Sequelize.DECIMAL,
  PEDPorcDescComercialTresEncabezadoPedidos: Sequelize.DECIMAL,
  PEDPorcDescFinancieroUnoEncabezadoPedidos: Sequelize.DECIMAL,
  PEDPorcDescFinancieroDosEncabezadoPedidos: Sequelize.DECIMAL,
  PEDPorcDescFinancieroTresEncabezadoPedidos: Sequelize.DECIMAL,
  PEDDiasDescFinancieroUnoEncabezadoPedidos: Sequelize.DECIMAL,
  PEDDiasDescFinancieroDosEncabezadoPedidos: Sequelize.DECIMAL,
  PEDDiasDescFinancieroTresEncabezadoPedidos: Sequelize.DECIMAL,
  PEDNroCuotasEncabezadoPedidos: Sequelize.INTEGER,
  PEDPeriodicidadEncabezadoPedidos: Sequelize.INTEGER,
  PEDPorcentajeFinanciacionEncabezadoPedidos: Sequelize.DECIMAL,
  PEDFormulaEncabezadoPedidos: Sequelize.STRING,
  PEDValorInicialEncabezadoPedidos: Sequelize.DECIMAL,
  PEDValorNetoEncabezadoPedidos: Sequelize.DECIMAL,
  PEDTransportadorEncabezadoPedidos: Sequelize.STRING,
  PEDPorcRetencionIvaEncabezadoPedidos: Sequelize.DECIMAL,
  PEDPorcRetencionIcaEncabezadoPedidos: Sequelize.DECIMAL,
  PEDComentariosEncabezadoPedidos: Sequelize.STRING,
  PEDOrigenMovimientoEncabezadoPedidos: Sequelize.STRING,
  PEDImpresoEncabezadoPedidos: Sequelize.INTEGER,
  PEDNumeroDocto1EncabezadoPedidos: Sequelize.STRING,
  PEDNumeroDocto2EncabezadoPedidos: Sequelize.STRING,
  PEDPrefijocotizacionEncabezadoPedidos: Sequelize.STRING,
  PEDNumerocotizacionEncabezadoPedidos: Sequelize.STRING
  },
  {
    indexes:[{primary: true, name: "PK_PEDENCABEZADOPEDIDOS", fields: ["PEDPrefijoPedidoEncabezadoPedidos", "PEDNumeroPedidoEncabezadoPedidos"]}],
    timestamps: false,
    freezeTableName: true,
    schema: 'dbo'
  }
);

PEDENCABEZADOPEDIDOS.removeAttribute('id');

module.exports = PEDENCABEZADOPEDIDOS;
