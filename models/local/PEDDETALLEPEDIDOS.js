var Sequelize = require('sequelize');
var DBLocal = require('./index');

const PEDDETALLEPEDIDOS = DBLocal.define('PEDDETALLEPEDIDOS', {
  PEDPrefijoPedidoDetallePedido: Sequelize.STRING,
  PEDNumeroPedidoDetallePedido: Sequelize.STRING,
  PEDItemDetallePedido: Sequelize.STRING,
  PEDCodigoReferenciaDetallePedido: Sequelize.STRING,
  PEDCantidadPedidaDetallePedido: Sequelize.DECIMAL,
  PEDPorcDescComercialUnoDetallePedido: Sequelize.DECIMAL,
  PEDPorcDescComercialDosDetallePedido: Sequelize.DECIMAL,
  PEDPorcDescComercialTresDetallePedido: Sequelize.DECIMAL,
  PEDPrecioPesosDetallePedido: Sequelize.DECIMAL,
  PEDPrecioOtraMonedaDetallePedido: Sequelize.DECIMAL,
  PEDPorcRetencionFuenteDetallePedido: Sequelize.DECIMAL,
  PEDLimiteRetencionFuenteDetallePedido: Sequelize.DECIMAL,
  PEDPorcIVADetallePedido: Sequelize.DECIMAL,
  PEDValorImpuestoConsumoDetallePedido: Sequelize.DECIMAL,
  PEDCodigoCentroCostosDetallePedido: Sequelize.STRING,
  PEDCodigoModeloContableDetallePedido: Sequelize.STRING,
  PEDComentariosDetallePedido: Sequelize.STRING,
  PEDValorRetencionFuenteDetallePedido: Sequelize.DECIMAL,
  PEDCantidadDespachadaDetallePedido: Sequelize.DECIMAL,
  PEDCodigoLoteDetallePEDIDOS: Sequelize.STRING,
  PEDPorcRetencionCREEDetallePedido: Sequelize.DECIMAL,
  PEDLimiteRetencionCREEDetallePedido: Sequelize.DECIMAL,
  PEDPrecioNIIFPesosDetallePedido: Sequelize.DECIMAL,
  PEDPrecioNIIFOtraMonedaDetallePedido: Sequelize.DECIMAL
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

PEDDETALLEPEDIDOS.removeAttribute('id');

module.exports = PEDDETALLEPEDIDOS;
