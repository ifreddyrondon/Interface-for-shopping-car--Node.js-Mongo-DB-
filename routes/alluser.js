var	BD = require('../BD')
	,	sanitize = require('validator').sanitize;

exports.product = function(req, res){
	if(req.body.id){
		id = sanitize(req.body.id).trim();
		id = sanitize(id).xss();
		id = sanitize(id).entityDecode();
		
		db = BD.mongodb();
		var producto_schema = require('../models/producto');
		Producto = db.model('Producto', producto_schema);

 	  Producto.findById(id, function(err, producto) {
 	  	if(err) res.send('1');
 	  	else{
	 	  	console.log(producto.titulo);	
 	  	}
    });
	}
	else
	 res.send('1');
}