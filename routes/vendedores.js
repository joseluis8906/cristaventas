var express = require('express');
var router = express.Router();
var Usuario = require('../models/local/Usuario');

var DB = require('../models/remote/index');

//select
router.post('/Select/', function(req, res, next) {

  var Data = req.body;

  DB.query("SELECT dbo.GVENDEDOR.GLBIdentificadorUnoVendedor AS Cedula, \
                    dbo.GVENDEDOR.GLBSucursalVendedor AS Sucursal, \
                    dbo.GVENDEDOR.GLBIdentificadorDosVendedor AS Codigo, \
                    dbo.GTERCEROS.GBLRazonSocialTerceros AS Nombre, \
                    SUBSTRING(dbo.GVENDEDOR.GLBComentariosVendedor, 1, 1) AS PrefijoPedido, \
                    SUBSTRING(dbo.GVENDEDOR.GLBComentariosVendedor, 3, 3) AS CodigoTipoDocumento \
            FROM dbo.GVENDEDOR INNER JOIN dbo.GTERCEROS \
            ON dbo.GVENDEDOR.GLBIdentificadorUnoVendedor = dbo.GTERCEROS.GBLIdentificadorUnoTerceros \
            AND dbo.GVENDEDOR.GLBSucursalVendedor = dbo.GTERCEROS.GBLSucursalTerceros")
  .spread((Result, Metadata) => {
      /*for (var i = 0; i < Result.length; i++)
      {
          Usuario.create({
            Cedula: Result[i].Cedula,
            Sucursal: Result[i].Sucursal,
            Codigo: Result[i].Codigo,
            Nombre: Result[i].Nombre,
            PrefijoPedido: Result[i].PrefijoPedido,
            CodigoTipoDocumento: Result[i].CodigoTipoDocumento
          });
      }*/
      res.json(Result);
  });
});

module.exports = router;
