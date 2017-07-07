var express = require('express');
var router = express.Router();

var DB = require('../models/remote/index');
var Inventario = require('../models/local/Inventario');

//select
router.post('/Select/', function(req, res, next) {

  var Data = req.body;

  DB.query("SELECT dbo.GREFERENCIA.GLBCodigoReferencia AS Referencia, \
                   dbo.GREFERENCIA.GLBNombreReferencia AS Nombre,  \
                   dbo.GREFERENCIA.GLBUnidadDeEmpaqueReferencia AS UnidadDeMedida, \
                   dbo.GREFERENCIA.GLBUnidadesPorEmpaqueReferencia AS UnidadPorEmpaque, \
                   SUBSTRING(dbo.GREFERENCIA.GLBComentarioReferencia, 1, 3) AS ModeloContable, \
                   dbo.GLINEAS.GLBNombreLinea AS Linea, \
                   dbo.GPRECIOSPORREFERENCIA.GLBValorUnitarioPreciosPorReferencia AS PrecioBase, \
                   dbo.GIMPUESTOSYRETENCIONES.GLBPorcentajeImpuestosYRetenciones AS Iva, \
                   dbo.GIMPUESTOSYRETENCIONES.GLBLimiteInferiorImpuestosYRetenciones AS LimiteIva, \
                   dbo.GREFERENCIA.GLBDescuento1Referencia AS PromocionDelProveedor, \
                   dbo.GREFERENCIA.GLBDescuento2Referencia AS PromocionDelMes, \
                   dbo.INQ_Pedidos_Existencias.Existencia, \
                   dbo.GREFERENCIAPORBODEGA.GLBUltimaFechaCompraReferenciaPorBodega AS FechaUltimaCompra, \
                   dbo.GREFERENCIAPORBODEGA.GLBUltimaFechaVentaReferenciaPorBodega AS FechaUltimaVenta, "+
                   //0 AS Cantidad, \
                   "SUBSTRING(dbo.GREFERENCIA.GLBComentarioReferencia, 5, 96) AS Observaciones, \
                   '' AS ComentarioDetallePedido \
            FROM dbo.GREFERENCIA \
            INNER JOIN dbo.GREFERENCIAPORBODEGA \
            ON dbo.GREFERENCIA.GLBCodigoReferencia = dbo.GREFERENCIAPORBODEGA.GLBCodigoReferenciaReferenciaPorBodega \
            INNER JOIN dbo.GIMPUESTOSYRETENCIONES \
            ON dbo.GREFERENCIA.GLBCodigoTarifaIvaReferencia = dbo.GIMPUESTOSYRETENCIONES.GLBCodigoImpuestosYRetenciones \
            INNER JOIN dbo.INQ_Pedidos_Existencias ON dbo.GREFERENCIA.GLBCodigoReferencia = dbo.INQ_Pedidos_Existencias.Codiigo \
            LEFT OUTER JOIN dbo.GLINEAS ON dbo.GREFERENCIA.GLBCodigoLineaReferencia = dbo.GLINEAS.GLBCodigoLinea \
            LEFT OUTER JOIN dbo.GPRECIOSPORREFERENCIA ON dbo.GREFERENCIA.GLBCodigoReferencia = dbo.GPRECIOSPORREFERENCIA.GLBCodigoReferenciaPreciosPorReferencia \
            WHERE (dbo.GREFERENCIAPORBODEGA.GLBCodigoBodegaReferenciaPorBodega = '1') \
            AND (SUBSTRING(dbo.GREFERENCIA.GLBNombreReferencia, 1, 2) <> 'XX')"
  ).spread((Result, Metadata) => {
      res.json(Result);
  });
});

module.exports = router;
