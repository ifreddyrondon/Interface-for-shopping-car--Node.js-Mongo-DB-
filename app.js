/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , user = require('./routes/user')
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
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
app.get('/', routes.index);
app.post('/disponibilidad', disponibilidad.disponibilidad);
app.post('/registrar', user.registrar);
app.post('/login', user.login);
app.get('/logout', user.logout);
//PICTURES
app.post('/pictures/upload', user.pictureUpload);
app.post('/pictures/SN', user.pictureSN);
app.post('/pictures/save', user.pictureSave);
app.post('/pictures/delete', user.pictureDelete);
app.post('/pictures/default', user.pictureDefault);
//DATOS
app.post('/datos', user.datos);
app.post('/user/datos', user.datosUpdate);
app.post('/user/datos/update', user.update);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});