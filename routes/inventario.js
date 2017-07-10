var express = require('express');
var router = express.Router();
var ClienteMqtt = require('../clientemqtt');
var Producto = require('../models/local/Producto');


//select
router.post('/Select/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne({ where: {Referencia: Data.Referencia}
  }).then(result => {
      res.json(result);
  }).catch(Err => {
      res.json({Result:0, Err: Err});
  });

});


/*
//insert
router.post('/Insert/', function(req, res, next) {

  var Data = req.body;

  Producto.create({
    Referencia: Data.Referencia,
    Existencia: Data.Existencia
  }).then(() => {
      res.json({Result: 1});
  }).catch (Err => {
      res.json({Result:0, Err: Err});
  });

});
*/

//update add
router.post('/Update/Add/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne ({where: {Referencia: Data.Referencia}
  }).then(Result => {
      Result.Existencia += Number(Data.Existencia),
      Result.save();
      res.json({Result: 1});
      if(ClienteMqtt.IsConnected())
      {
        Data.Operacion = "Add";
        Data.Iva = Result.Iva;
        Data.DescuentoDelMes = Result.DescuentoDelMes;
        Data.DescuentoDelProveedor = Result.DescuentoDelProveedor;
        ClienteMqtt.Publish(Data);
      }
  }).catch (Err => {
      res.json({Result:0, Err: Err});
  });
});


//update sub
router.post('/Update/Sub/', function(req, res, next) {

  var Data = req.body;

  Producto.findOne ({where: {Referencia: Data.Referencia}
  }).then(Result => {
    if(Result.Existencia <= Number(Data.Existencia)){
      Result.Existencia -= Number(Data.Existencia),
      Result.save();
      res.json({Result: 1});
      if(ClienteMqtt.IsConnected())
      {
        Data.Operacion = "Sub";
        Data.Iva = Result.Iva;
        Data.DescuentoDelMes = Result.DescuentoDelMes;
        Data.DescuentoDelProveedor = Result.DescuentoDelProveedor;
        ClienteMqtt.Publish(Data);
      }
    }
    else {
      res.json({Result:0, Err: "No hay existencia suficiente"});
    }
  }).catch (Err => {
      res.json({Result:0, Err: Err});
  });
});

module.exports = router;
