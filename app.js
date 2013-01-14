/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , gzippo = require('gzippo')
  , user = require('./routes/user')
  ,	admin = require('./routes/admin')
  , disponibilidad = require('./routes/disponibilidad')

var app = module.exports = express.createServer(
      express.cookieParser(),
      express.session({secret: 'lunapepelepu'})
);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));
	app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  //app.use(gzippo.staticGzip(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
app.get('/', routes.index);
app.post('/disponibilidad', disponibilidad.disponibilidad);
app.post('/registrar', user.registrar);
app.post('/login', user.login);
app.get('/logout', user.logout);
//PICTURE
app.post('/pictures/upload', user.pictureUpload);
app.post('/pictures/SN', user.pictureSN);
app.post('/pictures/save', user.pictureSave);
app.post('/pictures/delete', user.pictureDelete);
app.post('/pictures/default', user.pictureDefault);
//DATOS
app.post('/datos', user.datos);
app.post('/user/datos', user.datosUpdate);
app.post('/user/datos/update', user.update);
app.post('/user/datos/pass', user.pass);
//ADMIN
app.post('/admin/product', admin.product);
app.post('/admin/product/create', admin.productCreate);
app.post('/admin/product/createSend', admin.productCreateSend);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});