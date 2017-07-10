var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var clientes = require('./routes/clientes');
var vendedores = require('./routes/vendedores');
var productos = require('./routes/productos');
var inventario = require('./routes/inventario');
var pedidos = require('./routes/pedidos');
var jwt = require('jsonwebtoken');
var ClienteMqtt = require('./clientemqtt');

var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('superSecret', 'K3J9 8LMN 02F3 B3LW');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ Result: false, Err: 'Falló el token de autenticación' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).json({Result: 0, Err: 'No se encontró un token de autenticación válido'});

  }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public/scss'),
  dest: path.join(__dirname, 'public/css'),
  includePaths: ['node_modules/foundation-sites/scss', 'node_modules/motion-ui/src'],
  indentedSyntax: false, // true = .sass and false = .scss
  debug: true,
  prefix: '/css'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/private', router);
app.use('/private/clientes', clientes);
app.use('/private/vendedores', vendedores);
app.use('/private/productos', productos);
app.use('/private/inventario', inventario);
app.use('/private/pedidos', pedidos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
