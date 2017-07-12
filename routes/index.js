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


//cambiar la clave de acceso root
router.post('/private/root/Password/Change/', function (req, res, next) {
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


//cargar la pagina de actualizacion de inventario
router.get('/admin/inventario/', function(req, res, next) {

  res.render('inventario', { Nombre: 'Actualizar inventario', Acronimo: 'DCP'});
});

//Seleccionar existencia de un producto
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

//actualizacion de inventario, sumar existencia
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


//actualizacion de inventario restar existencia
router.post('/inventario/Update/Sub/', function (req, res, next) {
  var Data = req.body;

  Config1.findAll().then( R => {
    if (R.length === 0){
      res.json({Result: 0, Err: "No hay clave registrada"});
    }
    else if(bcrypt.compareSync(Data.Clave, R[0].Clave)) {

      Producto.findOne ({where: {Referencia: Data.Referencia}
      }).then(Result => {
          Result.Existencia -= Number(Data.Existencia),
          Result.save();
          res.json({Result: 1});
          if(ClienteMqtt.IsConnected())
          {
            Data.Operacion = "Sub";
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


//carga la pagina para sincronizar
router.get('/admin/sync/', function(req, res, next) {

  res.render('sync', { Nombre: 'Actualizar Base De Datos', Acronimo: 'DCP'});
});


//sincronizar clientes
router.post('/clientes/sync/', function (req, res, next){

  var Data = req.body;

  Config1.findAll().then( R => { // se carga la configuracion
  if (R.length === 0){ // si no hay configuracion guardada
     res.json({Result: 0, Err: "No hay clave registrada"}); // devuelve la respuesta de error en configuracion
  }
  else if(bcrypt.compareSync(Data.Clave, R[0].Clave)) { // comparacion de la clave root

    DBRemote.query("\
      SELECT \
        dbo.GCLIENTE.GLBIdentificadorUnoCliente AS Nit, \
        dbo.GCLIENTE.GLBSucursalCliente AS Sucursal, \
        dbo.GCLIENTE.GLBIdentificadorDosCliente AS Codigo, \
        dbo.GTERCEROS.GBLRazonSocialTerceros AS Nombre, \
        dbo.GTERCEROS.GBLDireccionTerceros AS Direccion, \
        dbo.GTERCEROS.GBLTelefono1Terceros AS Telefono1, \
        dbo.GTERCEROS.GBLTelefono2Terceros AS Telefono2, \
        dbo.GCLIENTE.GLBPorDescComercialUnoCliente AS Descuento, \
        dbo.GCLIENTE.GLBPlazoCliente AS Plazo \
      FROM \
        dbo.GCLIENTE \
      INNER JOIN \
        dbo.GTERCEROS \
      ON \
        dbo.GCLIENTE.GLBIdentificadorUnoCliente = dbo.GTERCEROS.GBLIdentificadorUnoTerceros \
      AND \
        dbo.GCLIENTE.GLBSucursalCliente = dbo.GTERCEROS.GBLSucursalTerceros"

    ).spread((Result, Metadata) => {
      for (var i = 0; i < Result.length; i++){ 
        
        Cliente.update({
          Sucursal: Result[i].Sucursal,
          Codigo: Result[i].Codigo,
          Nombre: Result[i].Nombre,
          Direccion: Result[i].Direccion,
          Telefono1: Result[i].Telefono1,
          Telefono2: Result[i].Telefono2,
          Descuento: Result[i].Descuento,
          Plazo: Result[i].Plazo
        },
        {
          where: {Nit: Result[i].Nit}
        }).then( R => {
          
          if (R === null){
          
            Cliente.create({
              Nit: Result[i].Nit,
              Sucursal: Result[i].Sucursal,
              Codigo: Result[i].Codigo,
              Nombre: Result[i].Nombre,
              Direccion: Result[i].Direccion,
              Telefono1: Result[i].Telefono1,
              Telefono2: Result[i].Telefono2,
              Descuento: Result[i].Descuento,
              Plazo: Result[i].Plazo
           
            }).then(()=>{

            }).catch(Err => {
              req.json({Result: 0, Err: "Error en sincronización de cliente, creando"});
            });
          
          }
        
        }).catch(Err => {
          req.json({Result: 0, Err: "Error en sincronización de cliente, actualizando"});
        });     
      }
    }).catch(Err => {
        res.json({Result: 0, Err: "Error en sincronización de clientes, consultando"});
    });
  
    }else{ //clave erronea
      res.json({Result: 0, Err: "Clave Erronea"});
    }
    
  }).catch (Err => {//error en la consulta de la configuracion
      res.json({Result:0, Err: Err});
  });

});


//sincronizar Vendedores
router.post('/vendedores/sync/', function (req, res, next){
  var Data = req.body;

  Config1.findAll().then( R => { // se carga la configuracion
  if (R.length === 0){ // si no hay configuracion guardada
     res.json({Result: 0, Err: "No hay clave registrada"}); // devuelve la respuesta de error en configuracion
  }
  else if(bcrypt.compareSync(Data.Clave, R[0].Clave)) { // comparacion de la clave root

    DBRemote.query("\
      SELECT dbo.GVENDEDOR.GLBIdentificadorUnoVendedor AS Cedula, \
        dbo.GVENDEDOR.GLBSucursalVendedor AS Sucursal, \
        dbo.GVENDEDOR.GLBIdentificadorDosVendedor AS Codigo, \
        dbo.GTERCEROS.GBLRazonSocialTerceros AS Nombre, \
        SUBSTRING(dbo.GVENDEDOR.GLBComentariosVendedor, 1, 1) AS PrefijoPedido, \
        SUBSTRING(dbo.GVENDEDOR.GLBComentariosVendedor, 3, 3) AS CodigoTipoDocumento \
      FROM \
        dbo.GVENDEDOR INNER JOIN dbo.GTERCEROS \
      ON \
        dbo.GVENDEDOR.GLBIdentificadorUnoVendedor = dbo.GTERCEROS.GBLIdentificadorUnoTerceros \
      AND \
        dbo.GVENDEDOR.GLBSucursalVendedor = dbo.GTERCEROS.GBLSucursalTerceros"
        
    ).spread((Result, Metadata) => {
      
      for (var i = 0; i < Result.length; i++){ 
        
        Vendedor.update({
          Sucursal: Result[i].Sucursal,
          Codigo: Result[i].Codigo,
          Nombre: Result[i].Nombre,
          PrefijoPedido: Result[i].PrefijoPedido,
          CodigoTipoDocumento: Result[i].CodigoTipoDocumento

        },
        {
          where: {Nit: Result[i].Nit}
        }).then( R => {
          
          if (R === null){
            
            var salt = bcrypt.genSaltSync();

            var Clave = bcrypt.hashSync(Result[i].Codigo.substr(-4,4), salt);

            Vendedor.create({
              Cedula: Result[i].Cedula,
              Sucursal: Result[i].Sucursal,
              Codigo: Result[i].Codigo,
              Nombre: Result[i].Nombre,
              PrefijoPedido: Result[i].PrefijoPedido,
              CodigoTipoDocumento: Result[i].CodigoTipoDocumento,
              Clave: Clave
            }).then(()=>{

            }).catch(Err => {
              req.json({Result: 0, Err: "Error en sincronización de vendedor, creando"});
            });
          
          }
        
        }).catch(Err => {
          req.json({Result: 0, Err: "Error en sincronización de vendedor, actualizando"});
        });     
      }
    }).catch(Err => {
        res.json({Result: 0, Err: "Error en sincronización de vendedor, consultando"});
    });
  
    }else{ //clave erronea
      res.json({Result: 0, Err: "Clave Erronea"});
    }
    
  }).catch (Err => {//error en la consulta de la configuracion
      res.json({Result:0, Err: Err});
  });

});


//sincronización de productos
router.post('/productos/Sync/', function (req, res, next) {
  var Data = req.body;

  Config1.findAll().then( R => { // se carga la configuracion
    if (R.length === 0){ // si no hay configuracion guardada
      res.json({Result: 0, Err: "No hay clave registrada"}); // devuelve la respuesta de error en configuracion
    }
    else if(bcrypt.compareSync(Data.Clave, R[0].Clave)) { // comparacion de la clave root

      DBRemote.query("\
        SELECT \
          dbo.GREFERENCIA.GLBCodigoReferencia AS Referencia, \
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
        FROM \
          dbo.GREFERENCIA \
        INNER JOIN \
          dbo.GREFERENCIAPORBODEGA \
        ON \
          dbo.GREFERENCIA.GLBCodigoReferencia = dbo.GREFERENCIAPORBODEGA.GLBCodigoReferenciaReferenciaPorBodega \
        INNER JOIN \
          dbo.GIMPUESTOSYRETENCIONES \
        ON \
          dbo.GREFERENCIA.GLBCodigoTarifaIvaReferencia = dbo.GIMPUESTOSYRETENCIONES.GLBCodigoImpuestosYRetenciones \
        INNER JOIN \
          dbo.INQ_Pedidos_Existencias ON dbo.GREFERENCIA.GLBCodigoReferencia = dbo.INQ_Pedidos_Existencias.Codiigo \
        LEFT OUTER JOIN \
          dbo.GLINEAS ON dbo.GREFERENCIA.GLBCodigoLineaReferencia = dbo.GLINEAS.GLBCodigoLinea \
        LEFT OUTER JOIN \
          dbo.GPRECIOSPORREFERENCIA ON dbo.GREFERENCIA.GLBCodigoReferencia = dbo.GPRECIOSPORREFERENCIA.GLBCodigoReferenciaPreciosPorReferencia \
        WHERE \
          (dbo.GREFERENCIAPORBODEGA.GLBCodigoBodegaReferenciaPorBodega = '1') \
        AND \
          (SUBSTRING(dbo.GREFERENCIA.GLBNombreReferencia, 1, 2) <> 'XX')"

      ).spread((Result, Metadata) => { //exito en consulta de productos

        for (var i = 0; i < Result.length; i++)
        {
          Productos.update({
            Nombre: Result[i].Nombre,
            UnidadDeMedida: Result[i].UnidadDeMedida,
            UnidadPorEmpaque: Result[i].UnidadPorEmpaque,
            ModeloContable: Result[i].ModeloContable,
            Linea: Result[i].Linea,
            PrecioBase: Result[i].PrecioBase,
            Iva: Result[i].Iva,
            LimiteIva: Result[i].LimiteIva,
            PromocionDelProveedor: Result[i].PromocionDelProveedor,
            PromocionDelMes: Result[i].PromocionDelMes,
            //Existencia: Result[i].Existencia; //en actualizacion no agregamos existencia
            FechaUltimaCompra: Result[i].FechaUltimaCompra,
            FechaUltimaVenta: Result[i].FechaUltimaVenta,
            Observaciones: Result[i].Observaciones,
          },
          {
            where: {Referencia: Result[i].Referencia}
          }).then(R => {
            
            if(R === null){
              Productos.Create({
                Nombre: Result[i].Nombre,
                UnidadDeMedida: Result[i].UnidadDeMedida,
                UnidadPorEmpaque: Result[i].UnidadPorEmpaque,
                ModeloContable: Result[i].ModeloContable,
                Linea: Result[i].Linea,
                PrecioBase: Result[i].PrecioBase,
                Iva: Result[i].Iva,
                LimiteIva: Result[i].LimiteIva,
                PromocionDelProveedor: Result[i].PromocionDelProveedor,
                PromocionDelMes: Result[i].PromocionDelMes,
                Existencia: Result[i].Existencia,
                FechaUltimaCompra: Result[i].FechaUltimaCompra,
                FechaUltimaVenta: Result[i].FechaUltimaVenta,
                Observaciones: Result[i].Observaciones,
                ComentarioDetallePedido: Result[i].ComentarioDetallePedido,
              }).then(() => {

              }).catch(Err => {
                res.json({Result:0, Err: "Error en sincronización de producto, creando"});
              });
            }
            
          }).catch(Err => {
              res.json({Result:0, Err: "Error en sincronización de producto, actualizando"});
          });
        }

      }).catch(Err => { // error en consulta de productos
          res.json({Result:0, Err: "Error en sincronización de productos, consultando"});
      });
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


module.exports = router;
