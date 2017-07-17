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
var PEDDETALLEPEDIDOS = require('../models/local/PEDDETALLEPEDIDOS');

//utilities
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//models sync
var RProducto = require('../models/remote/Producto');
var RCliente = require('../models/remote/Cliente');
var RVendedor = require('../models/remote/Vendedor');


router.post('/install/', function(req, res, next) {
    var Data = req.body;

    var salt = bcrypt.genSaltSync();
    var Clave = bcrypt.hashSync(Data.Clave, salt);

    Config1.create({
        Clave: Clave
    }).then(() => {
        res.json({ Result: 1 });
    }).catch(Err => {
        res.json({ Result: 0, Err: Err });
    });

});



router.post('/sync/productos/', function(req, res, next) {
    RProducto.findAll().then(R => {
        for (var i = 0; i < R.length; i++) {
            //console.log("{0}: compra: {1}, venta: {2}".replace("{0}", R[i].Referencia).replace("{1}", R[i].FechaUltimaCompra).replace("{2}", R[i].FechaUltimaVenta));
            //console.log(R[i].FechaUltimaCompra === "Invalid date");
            var FechaUltimaCompra = (R[i].FechaUltimaCompra === "Invalid date") ? null : R[i].FechaUltimaCompra;
            var FechaUltimaVenta = (R[i].FechaUltimaVenta === "Invalid date") ? null : R[i].FechaUltimaVenta;

            Producto.upsert({
                Referencia: R[i].Referencia,
                Nombre: R[i].Nombre,
                UnidadDeMedida: R[i].UnidadDeMedida,
                UnidadPorEmpaque: R[i].UnidadPorEmpaque,
                ModeloContable: R[i].ModeloContable,
                Linea: R[i].Linea,
                PrecioBase: R[i].PrecioBase,
                Iva: R[i].Iva,
                LimiteIva: R[i].LimiteIva,
                PromocionDelProveedor: R[i].PromocionDelMes,
                PromocionDelMes: R[i].PromocionDelMes,
                Existencia: R[i].Existencia,
                FechaUltimaCompra: FechaUltimaCompra,
                FechaUltimaVenta: FechaUltimaVenta,
                Observaciones: R[i].Observaciones
            });
        }
        res.json({ Result: 1 });
    }).catch(Err => {
        res.json({ Result: 0, Err: Err });
    });
});



router.post('/sync/clientes/', function(req, res, next) {
    RCliente.findAll().then(R => {
        for (var i = 0; i < R.length; i++) {

            Cliente.upsert({
                Nit: R[i].Nit,
                Sucursal: R[i].Sucursal,
                Codigo: R[i].Codigo,
                Nombre: R[i].Nombre,
                Direccion: R[i].Direccion,
                Telefono1: R[i].Telefono1,
                Telefono2: R[i].Telefono2,
                Descuento: R[i].Descuento,
                Plazo: R[i].Plazo
            });
        }
        res.json({ Result: 1 });
    }).catch(Err => {
        res.json({ Result: 0, Err: Err });
    });
});


router.post('/sync/vendedores/', function(req, res, next) {
    RVendedor.findAll().then(R => {

        var salt = bcrypt.genSaltSync();

        for (var i = 0; i < R.length; i++) {

            var Clave = bcrypt.hashSync(R[i].Cedula.substr(-4, 4), salt);

            Vendedor.upsert({
                Cedula: R[i].Cedula,
                Sucursal: R[i].Sucursal,
                Codigo: R[i].Codigo,
                Nombre: R[i].Nombre,
                PrefijoPedido: R[i].PrefijoPedido,
                CodigoTipoDocumento: R[i].CodigoTipoDocumento,
                Clave: Clave
            });
        }
        res.json({ Result: 1 });

    }).catch(Err => {
        res.json({ Result: 0, Err: Err });
    });
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});


//login
router.post('/login/', function(req, res, next) {
    var Data = (req.body);

    Vendedor.findOne({
        where: { Codigo: Data.Codigo }
    }).then(R => {
        if (R === null) {
            res.json({ Result: 0, Err: "El Vendedor no existe" });
            return;
        }
        if (R !== null) {
            bcrypt.compare(Data.Clave, R.Clave, function(err, result) {
                if (result) {
                    var token = jwt.sign({ User: R.Codigo }, req.app.get('superSecret'), {
                        expiresIn: "365d" //expires in 365 dias
                    });
                    res.json({ Result: 1, Token: token, Cedula: R.Cedula, Sucursal: R.Sucursal, Codigo: R.Codigo, Nombre: R.Nombre, PrefijoPedido: R.PrefijoPedido, CodigoTipoDocumento: R.CodigoTipoDocumento });
                } else {
                    res.json({ Result: 0, Err: "Clave equivocada" });
                }
            });
        } else {
            res.json({ Result: 0 });
        }
    }).catch(Err => {
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });
});


//change user password
router.post('/private/password/Change/', function(req, res, next) {
    var Data = (req.body);

    var salt = bcrypt.genSaltSync();

    Vendedor.findOne({
        where: { Codigo: Data.Codigo }
    }).then(R => {
        var verify = bcrypt.compareSync(Data.ClaveActual, R.Clave);

        if (verify) {
            R.Clave = bcrypt.hashSync(Data.ClaveNueva, salt);
            R.save();
            res.json({ Result: 1 });
        }

        res.json({ Result: 0, Err: "Clave actual erronea" });

    }).catch(Err => {
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });

});


//cambiar la clave de acceso root
router.post('/root/Password/Change/', function(req, res, next) {
    var Data = req.body;

    Config1.findAll().then(R => {
        if (R.length === 0) {
            res.json({ Result: 0, Err: "No hay clave registrada" });
        } else {
            var salt = bcrypt.genSaltSync();
            R[0].Clave = bcrypt.hashSync(Data.Clave, salt);
            R[0].save();
            res.json({ Result: 1 });
        }
    }).catch(Err => {
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });

});


//cargar la pagina de actualizacion de inventario
router.get('/admin/inventario/', function(req, res, next) {

    res.render('inventario', { Nombre: 'Actualizar inventario', Acronimo: 'DCP' });
});

//Seleccionar existencia de un producto
router.post('/inventario/Select/', function(req, res, next) {
    var Data = req.body;

    Config1.findAll().then(R => {
        if (R.length === 0) {
            res.json({ Result: 0, Err: "No hay clave registrada" });
        } else if (bcrypt.compareSync(Data.Clave, R[0].Clave)) {

            Producto.findOne({
                where: { Referencia: Data.Referencia }
            }).then(Result => {
                res.json(Result);
            }).catch(Err => {
                console.log(Err);
                res.json({ Result: 0, Err: Err });
            });
        } else {
            res.json({ Result: 0, Err: "Clave Erronea" });
        }
    }).catch(Err => {
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });

});

//actualizacion de inventario, sumar existencia
router.post('/inventario/Update/Add/', function(req, res, next) {
    var Data = req.body;

    Config1.findAll().then(R => {
        if (R.length === 0) {
            res.json({ Result: 0, Err: "No hay clave registrada" });
        } else if (bcrypt.compareSync(Data.Clave, R[0].Clave)) {

            Producto.findOne({
                where: { Referencia: Data.Referencia }
            }).then(Result => {
                Result.Existencia += Number(Data.Existencia),
                    Result.save();
                res.json({ Result: 1 });
                if (ClienteMqtt.IsConnected()) {
                    Data.Operacion = "Add";
                    ClienteMqtt.Publish(Data);
                }
            }).catch(Err => {
                console.log(Err);
                res.json({ Result: 0, Err: Err });
            });
        } else {
            res.json({ Result: 0, Err: "Clave Erronea" });
        }
    }).catch(Err => {
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });

});


//actualizacion de inventario restar existencia
router.post('/inventario/Update/Sub/', function(req, res, next) {
    var Data = req.body;

    Config1.findAll().then(R => {
        if (R.length === 0) {
            res.json({ Result: 0, Err: "No hay clave registrada" });
        } else if (bcrypt.compareSync(Data.Clave, R[0].Clave)) {

            Producto.findOne({
                where: { Referencia: Data.Referencia }
            }).then(Result => {
                Result.Existencia -= Number(Data.Existencia),
                    Result.save();
                res.json({ Result: 1 });
                if (ClienteMqtt.IsConnected()) {
                    Data.Operacion = "Sub";
                    ClienteMqtt.Publish(Data);
                }
            }).catch(Err => {
                console.log(Err);
                res.json({ Result: 0, Err: Err });
            });
        } else {
            res.json({ Result: 0, Err: "Clave Erronea" });
        }
    }).catch(Err => {
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });

});


//carga la pagina para sincronizar
router.get('/admin/sync/', function(req, res, next) {

    res.render('sync', { Nombre: 'Actualizar Base De Datos', Acronimo: 'DCP' });
});


//sincronizar clientes
router.post('/clientes/sync/', function(req, res, next) {

    var Data = req.body;

    Config1.findAll().then(R => { // se carga la configuracion
        if (R.length === 0) { // si no hay configuracion guardada
            res.json({ Result: 0, Err: "No hay clave registrada" }); // devuelve la respuesta de error en configuracion
        } else if (bcrypt.compareSync(Data.Clave, R[0].Clave)) { // comparacion de la clave root

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
                for (var i = 0; i < Result.length; i++) {

                    Cliente.upsert({
                        Nit: Result[i].Nit,
                        Sucursal: Result[i].Sucursal,
                        Codigo: Result[i].Codigo,
                        Nombre: Result[i].Nombre,
                        Direccion: Result[i].Direccion,
                        Telefono1: Result[i].Telefono1,
                        Telefono2: Result[i].Telefono2,
                        Descuento: Result[i].Descuento,
                        Plazo: Result[i].Plazo
                    });
                }

                res.json({ Result: 1 });

            }).catch(Err => {
                console.log(Err);
                res.json({ Result: 0, Err: "Error en sincronización de clientes, consultando" });
            });

        } else { //clave erronea
            res.json({ Result: 0, Err: "Clave Erronea" });
        }

    }).catch(Err => { //error en la consulta de la configuracion
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });

});


//sincronizar Vendedores
router.post('/vendedores/sync/', function(req, res, next) {
    var Data = req.body;

    Config1.findAll().then(R => { // se carga la configuracion
        if (R.length === 0) { // si no hay configuracion guardada
            res.json({ Result: 0, Err: "No hay clave registrada" }); // devuelve la respuesta de error en configuracion
        } else if (bcrypt.compareSync(Data.Clave, R[0].Clave)) { // comparacion de la clave root

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

                for (var i = 0; i < Result.length; i++) {

                    Vendedor.upsert({
                        Cedula: Result[i].Cedula,
                        Sucursal: Result[i].Sucursal,
                        Codigo: Result[i].Codigo,
                        Nombre: Result[i].Nombre,
                        PrefijoPedido: Result[i].PrefijoPedido,
                        CodigoTipoDocumento: Result[i].CodigoTipoDocumento

                    });
                }

                res.json({ Result: 1 });

            }).catch(Err => {
                console.log(Err);
                res.json({ Result: 0, Err: "Error en sincronización de vendedor, consultando" });
            });

        } else { //clave erronea
            res.json({ Result: 0, Err: "Clave Erronea" });
        }

    }).catch(Err => { //error en la consulta de la configuracion
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });

});


//sincronización de productos
router.post('/productos/Sync/', function(req, res, next) {
    var Data = req.body;

    Config1.findAll().then(R => { // se carga la configuracion
        if (R.length === 0) { // si no hay configuracion guardada
            res.json({ Result: 0, Err: "No hay clave registrada" }); // devuelve la respuesta de error en configuracion
        } else if (bcrypt.compareSync(Data.Clave, R[0].Clave)) { // comparacion de la clave root

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

                for (var i = 0; i < Result.length; i++) {
                    var FechaUltimaCompra = (Result[i].FechaUltimaCompra === "Invalid date") ? null : Result[i].FechaUltimaCompra;
                    var FechaUltimaVenta = (Result[i].FechaUltimaVenta === "Invalid date") ? null : Result[i].FechaUltimaVenta;

                    Producto.upsert({
                        Referencia: Result[i].Referencia,
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
                        FechaUltimaCompra: FechaUltimaCompra,
                        FechaUltimaVenta: FechaUltimaVenta,
                        Observaciones: Result[i].Observaciones
                    });
                }

                res.json({ Result: 1 });

            }).catch(Err => { // error en consulta de productos
                console.log(Err);
                res.json({ Result: 0, Err: "Error en sincronización de productos, consultando" });
            });
        }
        //clave erronea
        else {
            res.json({ Result: 0, Err: "Clave Erronea" });
        }
        //error en la consulta de la configuracion
    }).catch(Err => {
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });

});


//carga la pagina para eliminar pedido
router.get('/admin/pedido/', function(req, res, next) {
    res.render('pedido');
});


router.post('/pedido/eliminar/', function(req, res, next) {

    var Data = req.body;

    Config1.findAll().then(R => { // se carga la configuracion
        if (R.length === 0) { // si no hay configuracion guardada
            res.json({ Result: 0, Err: "No hay clave registrada" }); // devuelve la respuesta de error en configuracion
        } else if (bcrypt.compareSync(Data.Clave, R[0].Clave)) {
            Vendedor.findOne({
                where: {
                    Cedula: Data.CodigoVendedor
                }
            }).then(V => {
                if (V === null) {
                    res.json({ Result: 0, Err: 'El vendedor no existe' });

                } else if (V) {
                    PEDDETALLEPEDIDOS.findAll({
                        where: {
                            PEDPrefijoPedidoDetallePedido: V.PrefijoPedido,
                            PEDNumeroPedidoDetallePedido: Data.NumeroPedido
                        }
                    }).then(Dp => {
                        if (Dp.length === 0) {
                            res.json({ Result: 0, Err: 'El número del pedido no existe' });

                        } else if (Dp.length > 0) {

                            for (var i = 0; i < Dp.length; i++) {
                                Producto.findOne({
                                    where: {
                                        Referencia: Dp[i].PEDCodigoReferenciaDetallePedido
                                    }
                                }).then(P => {
                                    if (P) {
                                        P.Existencia = Number(Existencia) + Number(Dp[i].PEDCantidadPedidaDetallePedido);
                                        P.save();
                                    }
                                }).catch(Err => {
                                    consoele.log(Err);
                                });
                            }

                            res.json({ Result: 1 }); // todo exitoso
                        }
                    }).catch(Err => {

                    });
                }
            }).catch(Err => {
                console.log(Err);
                res.json({ Result: 0, Err: Err });
            });
        } else { //clave erronea
            res.json({ Result: 0, Err: "Clave Erronea" });
        }
    }).catch(Err => { //error en la consulta de la configuracion
        console.log(Err);
        res.json({ Result: 0, Err: Err });
    });
});

module.exports = router;