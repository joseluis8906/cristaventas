var express = require('express');
var router = express.Router();

var db = require('../models/local/index');
var Producto = require('../models/local/Producto');
var Inventario = require('../models/local/Inventario');

//select
router.post('/Select/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne({ where: {Codigo: Data.Codigo}, include: [Inventario]})
  .then(result => {
      res.json(result);
  });
  //res.json({Result: 1});
});

//insert
router.post('/Insert/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne({ where: {Codigo: Data.Codigo}, include: [Inventario]})
  .then(RProducto => {
      Inventario.create({
        CantidadDisponible: Data.CantidadDisponible,
        CantidadVendida: Data.CantidadVendida
      }).then(NuevoInventario => {
        NuevoInventario.setProducto(RProducto);
        NuevoInventario.save();
        res.json({Result: 1});
      });
  });
});


//update
router.post('/Update/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne ({where: {
      Codigo: Data.Codigo,
  }, include: [Inventario]})
  .then(R => {
      R.Inventario.CantidadDisponible = Data.CantidadDisponible,
      R.Inventario.CantidadVendida = Data.CantidadVendida,
      R.Inventario.save();
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
      R.Inventario.destroy();
      res.json({Result: 1});
  });
});

module.exports = router;
