var express = require('express');
var router = express.Router();
var ClienteMqtt = require('../clientemqtt');
var Inventario = require('../models/local/Inventario');


//select
router.post('/Select/', function(req, res, next) {

  var Data = req.body;

  Inventario.findOne({ where: {Referencia: Data.Referencia}
  }).then(result => {
      res.json(result);
  });

});


//insert
router.post('/Insert/', function(req, res, next) {

  var Data = req.body;

  Inventario.create({
    Referencia: Data.Referencia,
    Existencia: Data.Existencia
  }).then(() => {
      res.json({Result: 1});
  });

});


//update add
router.post('/Update/Add/', function(req, res, next) {

  var Data = req.body;
  Data.Operacion = "Add";

  Inventario.findOne ({where: {Referencia: Data.Referencia}
  }).then(Result => {
      Result.Existencia += Number(Data.Existencia),
      Result.save();
      res.json({Result: 1});
      if(ClienteMqtt.IsConnected())
      {
        ClienteMqtt.Publish(Data);
      }
  });
});


//update sub
router.post('/Update/Sub/', function(req, res, next) {

  var Data = req.body;
  Data.Operacion = "Sub";

  Inventario.findOne ({where: {Referencia: Data.Referencia}
  }).then(Result => {
      Result.Existencia -= Number(Data.Existencia),
      Result.save();
      res.json({Result: 1});
      if(ClienteMqtt.IsConnected())
      {
        ClienteMqtt.Publish(Data);
      }
  });
});

/*
//delete
router.post('/Delete/', function(req, res, next) {

  var Data = req.body;

  Inventario.findOne ({where: {Referencia: Data.Referencia}})
  .then(Result => {
      Result.Inventario.destroy();
      res.json({Result: 1});
  });

});*/

module.exports = router;
