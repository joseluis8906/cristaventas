var express = require('express');
var router = express.Router();

var db = require('../models/index');
var Cliente = require('../models/Cliente');

//select
router.post('/Select/', function(req, res, next) {

  var Data = req.body;

  Cliente.findOne({ where: {Nit: Data.Nit}})
  .then(result => {
      res.json(result);
  });
  //res.json({Result: 1});
});

//insert
router.post('/Insert/', function(req, res, next) {

  var Data = req.body;

  Cliente.create ({
      Nit: Data.Nit,
      Nombre: Data.Nombre,
      Direccion: Data.Direccion,
      Telefono: Data.Telefono,
      Descuento: Data.Descuento
  })
  .then(() => {
      res.json({Result: 1});
  });
});


//update
router.post('/Update/', function(req, res, next) {

  var Data = req.body;

  Cliente.findOne ({where: {
      Nit: Data.Nit,
  }
  })
  .then(R => {
      R.Nombre = Data.Nombre,
      R.Direccion = Data.Direccion,
      R.Telefono = Data.Telefono,
      R.Descuento = Data.Descuento
      R.save();
      res.json({Result: 1});
  });
});

//delete
router.post('/Delete/', function(req, res, next) {

  var Data = req.body;

  Cliente.findOne ({where: {
      Nit: Data.Nit,
  }})
  .then(R => {
      R.destroy();
      res.json({Result: 1});
  });
});

module.exports = router;
