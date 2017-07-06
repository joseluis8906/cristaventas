var express = require('express');
var router = express.Router();

var PEDENCABEZADOPEDIDOS = require('../models/local/PEDENCABEZADOPEDIDOS');
var PEDDETALLEPEDIDOS = require('../models/local/PEDDETALLEPEDIDOS');


//insert
router.post('/Insert/', function(req, res, next) {

  var Data = req.body;
  console.log(Data.Detalles.length);

  /*return sequelize.transaction(function (t) {*/

    // chain all your queries here. make sure you return them.
        PEDENCABEZADOPEDIDOS.create({
        PEDPrefijoPedidoEncabezadoPedidos: Data.PrefijoPedido, //primer caracter de campo comentario tabla vendedores
        PEDNumeroPedidoEncabezadoPedidos: Data.NumeroPedido, //numero del consecutivo del pedido del vendedor
        PEDIdDocumentoEncabezadoPedidos: 'PD',
        PEDCodigoTipoDocumentoEncabezadoPedidos: Data.CodigoTipoDocumento, //ultimos tres caracteres de campo comentario tabla vendedor
        PEDFechaPedidoEncabezadoPedidos: Data.FechaPedido, //fecha en formato dd/mm/aaaa
        PEDFechaEntregaEncabezadoPedidos: Data.FechaEntrega, //fecha en formato dd/mm/aaaa
        PEDIdentificadorDosClienteEncabezadoPedidos: Data.IdentificadorDosCliente, //numero de IdentificadorDosCliente
        PEDIdentificadorUnoClienteEncabezadoPedidos: Data.IdentificadorUnoCliente, //numeo de IdentificadorUnoCliente
        PEDSucursalClienteEncabezadoPedidos: Data.SucursalCliente, //sucursal tabla clientes
        PEDIdentificadorUnoVendedorEncabezadoPedidos: Data.IdentificadorUnoVendedor, //numero IdentificadorUnoVendedor
        PEDSucursalVendedorEncabezadoPedidos: Data.SucursalVendedor, //sucursal vendedor
        PEDIdentificadorDosVendedorEncabezadoPedidos: Data.IdentificadorDosVendedor, //numero de IdentificadorDosVendedor
        PEDPlazoEncabezadoPedidos: Data.Plazo, //numero plazo tabla clientes
        PEDCodigoMonedaEncabezadoPedidos: '000',
        PEDTasaCambioEncabezadoPedidos: 0,
        PEDEstadoEncabezadoPedidos: 'DI',
        PEDPorcDescComercialUnoEncabezadoPedidos: 0,
        PEDPorcDescComercialDosEncabezadoPedidos: 0,
        PEDPorcDescComercialTresEncabezadoPedidos: 0,
        PEDPorcDescFinancieroUnoEncabezadoPedidos: 0,
        PEDPorcDescFinancieroDosEncabezadoPedidos: 0,
        PEDPorcDescFinancieroTresEncabezadoPedidos: 0,
        PEDDiasDescFinancieroUnoEncabezadoPedidos: 0,
        PEDDiasDescFinancieroDosEncabezadoPedidos: 0,
        PEDDiasDescFinancieroTresEncabezadoPedidos: 0,
        PEDNroCuotasEncabezadoPedidos: 0,
        PEDPeriodicidadEncabezadoPedidos: 0,
        PEDPorcentajeFinanciacionEncabezadoPedidos: 0,
        PEDFormulaEncabezadoPedidos: null,
        PEDValorInicialEncabezadoPedidos: 0,
        PEDValorNetoEncabezadoPedidos: Data.ValorNeto,
        PEDTransportadorEncabezadoPedidos: null,
        PEDPorcRetencionIvaEncabezadoPedidos: 0,
        PEDPorcRetencionIcaEncabezadoPedidos: 0,
        PEDComentariosEncabezadoPedidos: null,
        PEDOrigenMovimientoEncabezadoPedidos: 'PED',
        PEDImpresoEncabezadoPedidos: 0,
        PEDNumeroDocto1EncabezadoPedidos: null,
        PEDNumeroDocto2EncabezadoPedidos: null,
        PEDPrefijocotizacionEncabezadoPedidos: null,
        PEDNumerocotizacionEncabezadoPedidos: null
      }).then(()=>{
    /*}, {transaction: t}).then(function (user) {*/
      for (var i = 0; i < Data.Detalles.length; i++)
      {
          PEDDETALLEPEDIDOS.create({
            PEDPrefijoPedidoDetallePedido: Data.Detalles[i].PrefijoPedido, //primer caracter de campo comentario tabla vendedores
            PEDNumeroPedidoDetallePedido: Data.Detalles[i].NumeroPedido, //numero del consecutivo del pedido del vendedor
            PEDItemDetallePedido: Data.Detalles[i].Item, //posicion del item en el pedido debe tener 5 caracteres
            PEDCodigoReferenciaDetallePedido: Data.Detalles[i].CodigoReferencia, //codigo referencia del producto
            PEDCantidadPedidaDetallePedido: Data.Detalles[i].CantidadPedida, //cantidad
            PEDPorcDescComercialUnoDetallePedido: Data.Detalles[i].DescuentoCliente, //descuento en la tabla cliente
            PEDPorcDescComercialDosDetallePedido: Data.Detalles[i].DescuentoProveedor, // descuento en la tabla greferencia
            PEDPorcDescComercialTresDetallePedido: 0,
            PEDPrecioPesosDetallePedido: Data.Detalles[i].PrecioBase, //precio de referencia sin iva
            PEDPrecioOtraMonedaDetallePedido: 0,
            PEDPorcRetencionFuenteDetallePedido: 0,
            PEDLimiteRetencionFuenteDetallePedido: Data.Detalles[i].LimiteIva, //limite de iva
            PEDPorcIVADetallePedido: Data.Detalles[i].Iva, //iva de la referencia
            PEDValorImpuestoConsumoDetallePedido: 0,
            PEDCodigoCentroCostosDetallePedido: '000',
            PEDCodigoModeloContableDetallePedido: Data.Detalles[i].ModeloContable, //modelo contable de la tabal referencia
            PEDComentariosDetallePedido: Data.Detalles[i].Comentarios, //comentario del vendedor
            PEDValorRetencionFuenteDetallePedido: 0,
            PEDCantidadDespachadaDetallePedido: 0,
            PEDCodigoLoteDetallePEDIDOS: null,
            PEDPorcRetencionCREEDetallePedido: 0,
            PEDLimiteRetencionCREEDetallePedido: 0,
            PEDPrecioNIIFPesosDetallePedido: 0,
            PEDPrecioNIIFOtraMonedaDetallePedido:0

        /*}, {transaction: t});*/
      }).then(()=>{}).catch(err=>{res.json({Result: 1, Err: err}); return;});
      }
      res.json({Result: 1});

    }).catch(function (err) {
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
      res.json({Result: 0, Err: err})

    });
  /*}).then(function (Result) {
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
    res.json({Result: 1});

  }).catch(function (err) {
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
    res.json({Result: 0, Err: err})

  });
  DB.query("")
  .spread((Result, Metadata) => {
      res.json(Result);
  });*/
});

module.exports = router;
