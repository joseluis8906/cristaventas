var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin/cliente/', function(req, res, next) {
  res.render('cliente', { title: 'Clientes' });
});

router.get('/admin/vendedor/', function(req, res, next) {
  res.render('vendedor', { title: 'Vendedor' });
});


router.get('/admin/producto/', function(req, res, next) {
  res.render('producto', { title: 'Productos' });
});


module.exports = router;
