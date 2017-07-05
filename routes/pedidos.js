var express = require('express');
var router = express.Router();

var Pedido = require('../models/local/Pedido');
var Cliente = require('../models/local/Cliente');
var PedidoRegistro = require('../models/local/PedidoRegistro');
var Producto = require('../models/local/Producto');


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


module.exports = router;
