var express = require('express');
var router = express.Router();

var db = require('../models/index');
var Producto = require('../models/Producto');

//select
router.post('/Select/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne({ where: {Codigo: Data.Codigo}})
  .then(result => {
      res.json(result);
  });
  //res.json({Result: 1});
});

//insert
router.post('/Insert/', function(req, res, next) {

  var Data = req.body;

  Producto.create ({
      Codigo: Data.Codigo,
      Nombre: Data.Nombre,
      DescuentoProveedor: Data.DescuentoProveedor,
      PrecioUnitario: Data.PrecioUnitario,
      Iva: Data.Iva
  })
  .then(() => {
      res.json({Result: 1});
  });
});


//update
router.post('/Update/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne ({where: {
      Codigo: Data.Codigo,
  }
  })
  .then(R => {
      R.Nombre = Data.Nombre,
      R.DescuentoProveedor = Data.DescuentoProveedor,
      R.PrecioUnitario = Data.PrecioUnitario,
      R.Iva = Data.Iva
      R.save();
      res.json({Result: 1});
  });
});

//delete
router.post('/Delete/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne ({where: {
      Codigo: Data.Codigo,
  }})
  .then(R => {
      R.destroy();
      res.json({Result: 1});
  });
});

module.exports = router;
