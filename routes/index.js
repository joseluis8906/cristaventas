var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin/cliente/', function(req, res, next) {
  res.render('cliente', { title: 'Clientes' });
});

router.get('/admin/producto/', function(req, res, next) {
  res.render('producto', { title: 'Productos' });
});

router.get('/admin/inventario/', function(req, res, next) {
  res.render('inventario', { title: 'Inventario' });
});

router.get('/admin/pedido/', function(req, res, next) {
  res.render('pedido', { title: 'Pedidos' });
});

module.exports = router;
