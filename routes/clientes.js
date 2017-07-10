var express = require('express');
var router = express.Router();
var Cliete = require('../models/local/Cliente');

//var GCLIENTE = require('../models/remote/GCLIENTE');
var DB = require('../models/remote/index');

//sincronizar remota con local
router.post('/Sync/', function(req, res, next) {

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
  }).catch(Err => {
      res.json({Result: 0, Err: Err});
  });

});


//seleccionar todos los clientes
router.post('/Select/', function(req, res, next){
  Cliente.findAll().then(Result => {
    res.json(Result);
  }).catch(Err => {
    res.json({Result: 0, Err: Err});
  });
});

module.exports = router;
