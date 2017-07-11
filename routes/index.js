//basics
var express = require('express');
var router = express.Router();
var ClienteMqtt = require('../clientemqtt');
var DBRemote = require('../models/remote/index');

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

  Config1.findAll().then( R => { // se carga la configuracion
    if (R.length === 0){ // si no hay configuracion guardada
      res.json({Result: 0, Err: "No hay clave registrada"}); // devuelve la respuesta de error en configuracion
    }
    else if(bcrypt.compareSync(Data.Clave, R[0].Clave)) { // comparacion de la clave root

      DBRemote.query("SELECT dbo.GREFERENCIA.GLBCodigoReferencia AS Referencia, \
                       dbo.GREFERENCIA.GLBNombreReferencia AS Nombre,  \
                       dbo.GREFERENCIA.GLBUnidadDeEmpaqueReferencia AS UnidadDeMedida, \
                       dbo.GREFERENCIA.GLBUnidadesPorEmpaqueReferencia AS UnidadPorEmpaque, \
                       SUBSTRING(dbo.GREFERENCIA.GLBComentarioReferencia, 1, 3) AS ModeloContable, \
                       dbo.GLINEAS.GLBNombreLinea AS Linea, \
                       dbo.GPRECIOSPORREFERENCIA.GLBValorUnitarioPreciosPorReferencia AS PrecioBase, \
                       dbo.GIMPUESTOSYRETENCIONES.GLBPorcentajeImpuestosYRetenciones AS Iva, \
                       dbo.GIMPUESTOSYRETENCIONES.GLBLimiteInferiorImpuestosYRetenciones AS LimiteIva, \
                       dbo.GREFERENCIA.GLBDescuento1Referencia AS PromocionDelProveedor, \
                       dbo.GREFERENCIA.GLBDescuento2Referencia AS PromocionDelMes, \
                       dbo.INQ_Pedidos_Existencias.Existencia AS Existencia, \
                       dbo.GREFERENCIAPORBODEGA.GLBUltimaFechaCompraReferenciaPorBodega AS FechaUltimaCompra, \
                       dbo.GREFERENCIAPORBODEGA.GLBUltimaFechaVentaReferenciaPorBodega AS FechaUltimaVenta, \
                       SUBSTRING(dbo.GREFERENCIA.GLBComentarioReferencia, 5, 96) AS Observaciones, \
                       '' AS ComentarioDetallePedido \
                FROM dbo.GREFERENCIA \
                INNER JOIN dbo.GREFERENCIAPORBODEGA \
                ON dbo.GREFERENCIA.GLBCodigoReferencia = dbo.GREFERENCIAPORBODEGA.GLBCodigoReferenciaReferenciaPorBodega \
                INNER JOIN dbo.GIMPUESTOSYRETENCIONES \
                ON dbo.GREFERENCIA.GLBCodigoTarifaIvaReferencia = dbo.GIMPUESTOSYRETENCIONES.GLBCodigoImpuestosYRetenciones \
                INNER JOIN dbo.INQ_Pedidos_Existencias ON dbo.GREFERENCIA.GLBCodigoReferencia = dbo.INQ_Pedidos_Existencias.Codiigo \
                LEFT OUTER JOIN dbo.GLINEAS ON dbo.GREFERENCIA.GLBCodigoLineaReferencia = dbo.GLINEAS.GLBCodigoLinea \
                LEFT OUTER JOIN dbo.GPRECIOSPORREFERENCIA ON dbo.GREFERENCIA.GLBCodigoReferencia = dbo.GPRECIOSPORREFERENCIA.GLBCodigoReferenciaPreciosPorReferencia \
                WHERE (dbo.GREFERENCIAPORBODEGA.GLBCodigoBodegaReferenciaPorBodega = '1') \
                AND (SUBSTRING(dbo.GREFERENCIA.GLBNombreReferencia, 1, 2) <> 'XX')"
      ).spread((Result, Metadata) => { //exito en consulta de productos

        for (var i = 0; i < Result.length; i++)
        {
          Productos.findOne({
            where: {Referencia: Result[i].Referencia}
          }).then(P => {
            P.Nombre = Result[i].Nombre;
            P.UnidadDeMedida = Result[i].UnidadDeMedida;
            P.UnidadPorEmpaque = Result[i].UnidadPorEmpaque;
            P.ModeloContable = Result[i].ModeloContable;
            P.Linea = Result[i].Linea;
            P.PrecioBase = Result[i].PrecioBase;
            P.Iva = Result[i].Iva;
            P.LimiteIva = Result[i].LimiteIva;
            P.PromocionDelProveedor = Result[i].PromocionDelProveedor;
            P.PromocionDelMes = Result[i].PromocionDelMes;
            P.Existencia = Result[i].Existencia;
            P.FechaUltimaCompra = Result[i].FechaUltimaCompra;
            P.FechaUltimaVenta = Result[i].FechaUltimaVenta;
            P.Observaciones = Result[i].Observaciones;
            P.ComentarioDetallePedido = Result[i].ComentarioDetallePedido;
          }).catch(Err => {
              res.json({Result:0, Err: "Error en actualizacion de productos"});
          });
        }

      }).catch(Err => { // error en consulta de productos
          res.json({Result:0, Err: Err});
      });


      //res.json({Result: 1});//respuesta exitosa va en la ultima consulta
    }
    //clave erronea
    else{
      res.json({Result: 0, Err: "Clave Erronea"});
    }
    //error en la consulta de la configuracion
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
