var express = require('express');
var router = express.Router();
var Usuario = require('../models/local/Usuario');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { Nombre: 'Distribuidora Cristaleria Popular', Acronimo: 'DCP'});
});

/*
router.post('/usuarios/Init/', function(req, res, next){
  var Data = req.body;

  var salt = bcrypt.genSaltSync();

  Usuario.findAll().then(Usuarios => {
    for (var i = 0; i < Usuarios.length; i++)
    {
       Usuarios[i].Clave = bcrypt.hashSync(Usuarios[i].Codigo.substr(-4,4), salt);
       Usuarios[i].save();
    }
  });

  res.json({Result: 1});
});*/


router.post('/login/', function (req, res, next) {
    var Data = (req.body);

    Usuario.findOne({ where: {Codigo: Data.Codigo}
    }).then(R => {
      if(R === null)
      {
        res.json({Result: 0, Err: "El Usuario no existe"});
        return;
      }
      if (R !== null) {
        bcrypt.compare(Data.Clave, R.Clave, function(err, result) {
            if(result){
              var token = jwt.sign({User: R.Codigo}, req.app.get('superSecret'), {
                expiresIn: "12h" // expires in 365 dias
              });
              res.json({Result: 1, Token: token, Cedula: R.Cedula, Sucursal: R.Sucursal, Codigo: R.Codigo, Nombre: R.Nombre, PrefijoPedido: R.PrefijoPedido, CodigoTipoDocumento: R.CodigoTipoDocumento});
            }
            else {
              res.json({Result: 0, Err: "Clave equivocada"});
            }
        });
      }
      else {
        res.json({Result: 0});
      }
    });
});


module.exports = router;
