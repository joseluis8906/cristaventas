var express = require('express');
var router = express.Router();

//var GCLIENTE = require('../models/remote/GCLIENTE');
var DB = require('../models/remote/index');

//select
router.post('/Select/', function(req, res, next) {

  var Data = req.body;

  DB.query("SELECT dbo.GCLIENTE.GLBIdentificadorUnoCliente AS Nit, \
                          dbo.GCLIENTE.GLBSucursalCliente AS Sucursal, \
                          dbo.GCLIENTE.GLBIdentificadorDosCliente AS Codigo, \
                          dbo.GTERCEROS.GBLRazonSocialTerceros AS Nombre, \
                          dbo.GTERCEROS.GBLDireccionTerceros AS Direccion, \
                          dbo.GTERCEROS.GBLTelefono1Terceros AS Telefono1, \
                          dbo.GTERCEROS.GBLTelefono2Terceros AS Telefono2, \
                          dbo.GCLIENTE.GLBPorDescComercialUnoCliente AS Descuento, \
                          dbo.GCLIENTE.GLBPlazoCliente AS Plazo \
                  FROM dbo.GCLIENTE \
                  INNER JOIN dbo.GTERCEROS \
                  ON dbo.GCLIENTE.GLBIdentificadorUnoCliente = dbo.GTERCEROS.GBLIdentificadorUnoTerceros \
                  AND dbo.GCLIENTE.GLBSucursalCliente = dbo.GTERCEROS.GBLSucursalTerceros")
  .spread((Result, Metadata) => {
      res.json(Result);
  });
});

module.exports = router;
