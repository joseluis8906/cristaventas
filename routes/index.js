//basics
var express = require('express');
var router = express.Router();
var ClienteMqtt = require('../clientemqtt');


//models
var Vendedor = require('../models/local/Vendedor');
var Config1 = require('../models/local/Config1');
var Producto = require('../models/local/Producto');
var Cliente = require('../models/local/Cliente');

//utilities
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { Nombre: 'Distribuidora Cristaleria Popular', Acronimo: 'DCP'});
});


/*
router.post('/Vendedores/Init/', function(req, res, next){
  var Data = req.body;

  var salt = bcrypt.genSaltSync();

  Vendedor.findAll().then(Vendedors => {
    for (var i = 0; i < Vendedores.length; i++)
    {
       Vendedores[i].Clave = bcrypt.hashSync(Vendedores[i].Codigo.substr(-4,4), salt);
       Vendedores[i].save();
    }
  });

  res.json({Result: 1});
});*/


//login
router.post('/login/', function (req, res, next) {
    var Data = (req.body);

    Vendedor.findOne({ where: {Codigo: Data.Codigo}
    }).then(R => {
      if(R === null)
      {
        res.json({Result: 0, Err: "El Vendedor no existe"});
        return;
      }
      if (R !== null) {
        bcrypt.compare(Data.Clave, R.Clave, function(err, result) {
            if(result){
              var token = jwt.sign({User: R.Codigo}, req.app.get('superSecret'), {
                expiresIn: "365d"//expires in 365 dias
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
    }).catch (Err => {
        res.json({Result:0, Err: Err});
    });
});


//change user password
router.post('/private/password/Change/', function (req, res, next) {
  var Data = (req.body);

  var salt = bcrypt.genSaltSync();

  Vendedor.findOne({ where: {Codigo: Data.Codigo}
  }).then(R => {
    var verify = bcrypt.compareSync(Data.ClaveActual, R.Clave);

    if (verify)
    {
      R.Clave = bcrypt.hashSync(Data.ClaveNueva, salt);
      R.save();
      res.json({Result: 1});
    }

    res.json({Result: 0, Err: "Clave actual erronea"});

  }).catch (Err => {
      res.json({Result:0, Err: Err});
  });

});


//carga la pagina para sincronizar
router.get('/admin/update/', function(req, res, next) {

  res.render('update', { Nombre: 'Actualizar Base De Datos', Acronimo: 'DCP'});
});


//sincronización de bases de datos
router.post('/data/Update/', function (req, res, next) {
  var Data = req.body;

  Config1.findAll().then( R => {
    if (R.length === 0){
      res.json({Result: 0, Err: "No hay clave registrada"});
    }
    else if(bcrypt.compareSync(Data.Clave, R[0].Clave)) {
      res.json({Result: 1});
    }
    else{
      res.json({Result: 0, Err: "Clave Erronea"});
    }
  }).catch (Err => {
      res.json({Result:0, Err: Err});
  });

});


//cambiar la clave de acceso root
router.post('/private/data/Password/Change/', function (req, res, next) {
  var Data = req.body;

  Config1.findAll().then( R => {
    if (R.length === 0)
    {
      res.json({Result: 0, Err: "No hay clave registrada"});
    }
    else {
      var salt = bcrypt.genSaltSync();
      R[0].Clave = bcrypt.hashSync(Data.Clave, salt);
      R[0].save();
      res.json({Result: 1});
    }
  }).catch (Err => {
      res.json({Result:0, Err: Err});
  });

});

/*
//inventario
router.get('/admin/inventario/', function(req, res, next) {

  res.render('inventario', { Nombre: 'Actualizar inventario', Acronimo: 'DCP'});
});

router.post('/inventario/Select/', function (req, res, next) {
  var Data = req.body;

  Config1.findAll().then( R => {
    if (R.length === 0){
      res.json({Result: 0, Err: "No hay clave registrada"});
    }
    else if(bcrypt.compareSync(Data.Clave, R[0].Clave)) {

      Producto.findOne ({where: {Referencia: Data.Referencia}
      }).then(Result => {
          res.json(Result);
      }).catch (Err => {
          res.json({Result:0, Err: Err});
      });
    }
    else{
      res.json({Result: 0, Err: "Clave Erronea"});
    }
  }).catch (Err => {
      res.json({Result:0, Err: Err});
  });

});

//actualizacion de datos
router.post('/inventario/Update/Add/', function (req, res, next) {
  var Data = req.body;

  Config1.findAll().then( R => {
    if (R.length === 0){
      res.json({Result: 0, Err: "No hay clave registrada"});
    }
    else if(bcrypt.compareSync(Data.Clave, R[0].Clave)) {

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
    }
    else{
      res.json({Result: 0, Err: "Clave Erronea"});
    }
  }).catch (Err => {
      res.json({Result:0, Err: Err});
  });

});


//sincronizar clientes

router.post('/sync/clientes/', function (req, res, next){
  for (var i = 0; i < JsonClientes.length; i++)
  {
      Cliente.create({
        Nit: JsonClientes[i].Nit,
        Sucursal: JsonClientes[i].Sucursal,
        Codigo: JsonClientes[i].Codigo,
        Nombre: JsonClientes[i].Nombre,
        Direccion: JsonClientes[i].Direccion,
        Telefono1: JsonClientes[i].Telefono1,
        Telefono2: JsonClientes[i].Telefono2,
        Descuento: JsonClientes[i].Descuento,
        Plazo: JsonClientes[i].Plazo
      }).then(()=>{

      }).catch(Err => {
        req.json({Result: 0, Err: Err});
      });
  }
  res.json({Result: 1});
});


//sincronizar productos

router.post('/sync/productos/', function (req, res, next){

  var Q = "";

  ProductoBk.findAll().then(JsonProductos => {

    for (var i = 0; i < JsonProductos.length; i++)
    {
        Q += "UPDATE "+
                "Producto "+
             "SET "+
                "Nombre = '" + JsonProductos[i].Nombre + "'," +
                "UnidadDeMedida = '" + JsonProductos[i].UnidadDeMedida + "'," +
                "UnidadPorEmpaque = " + JsonProductos[i].UnidadPorEmpaque + "," +
                "ModeloContable = '" + JsonProductos[i].ModeloContable + "'," +
                "Linea = '" + JsonProductos[i].Linea + "'," +
                "PrecioBase = " + JsonProductos[i].PrecioBase + "," +
                "Iva = " + JsonProductos[i].Iva + "," +
                "LimiteIva = " + JsonProductos[i].LimiteIva + "," +
                "PromocionDelProveedor = " + JsonProductos[i].PromocionDelProveedor + "," +
                "PromocionDelMes = " + JsonProductos[i].PromocionDelMes + "," +
                "FechaUltimaCompra = '" + JsonProductos[i].FechaUltimaCompra + "'," +
                "FechaUltimaVenta = '" + JsonProductos[i].FechaUltimaVenta + "'," +
                "Observaciones = '" + JsonProductos[i].Observaciones + "' " +
                //"ComentarioDetallePedido = '" + JsonProductos[i].ComentarioDetallePedido + "'," +
              "WHERE Referencia = '" + JsonProductos[i].Referencia + "'; ";

        Producto.update(
          {
            Nombre: JsonProductos[i].Nombre,
            UnidadDeMedida: JsonProductos[i].UnidadDeMedida,
            UnidadPorEmpaque: JsonProductos[i].UnidadPorEmpaque,
            ModeloContable: JsonProductos[i].ModeloContable,
            Linea: JsonProductos[i].Linea,
            PrecioBase: JsonProductos[i].PrecioBase,
            Iva: JsonProductos[i].Iva,
            LimiteIva: JsonProductos[i].LimiteIva,
            PromocionDelProveedor: JsonProductos[i].PromocionDelProveedor,
            PromocionDelMes: JsonProductos[i].PromocionDelMes,
            FechaUltimaCompra: JsonProductos[i].FechaUltimaCompra,
            FechaUltimaVenta: JsonProductos[i].FechaUltimaVenta,
            Observaciones: JsonProductos[i].Observaciones
          },
          {
            where: {Referencia: JsonProductos[i].Referencia}
          }
        ).then(() => {

        }).catch(Err => {
            res.json({Result: 0, Err: Err});
        });
    }
    res.json({Result: 1});

  }).catch(Err => {
      res.json({Result: 0, Err: Err});
  });
  /*
  DBLocal.query("", {

  }).then(()=>{
    res.json({Result: 1});
  }).catch(Err => {
    req.json({Result: 0, Err: Err});
  });


});
*/

module.exports = router;
