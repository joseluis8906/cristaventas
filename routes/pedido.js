var express = require('express');
var router = express.Router();

var db = require('../models/index');
var Pedido = require('../models/Pedido');
var Cliente = require('../models/Cliente');
var PedidoRecord = require('../models/PedidoRecord');
var Producto = require('../models/Producto');

//select
router.post('/Select/', function(req, res, next) {

  var Data = req.body;

  Pedido.findOne({ where: {Codigo: Data.Codigo}, include: [Cliente, PedidoRecord]})
  .then(result => {
      res.json(result);
  });
  //res.json({Result: 1});
});

//insert
router.post('/Insert/', function(req, res, next) {

  var Data = req.body;

  Cliente.findOne({where: Data.Nit})
  .then(FCliente => {
    Pedido.create({
      Codigo: Data.Codigo,
      Fecha: Data.Fecha,
      FechaDeEntrega: Data.FechaDeEntrega,
    }).then(NuevoPedido => {
      NuevoPedido.setCliente(FCliente);
      NuevoPedido.save();
    });
    res.json({Result: 1});
  });
});


//update
router.post('/Update/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne ({where: {
      Codigo: Data.Codigo,
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
