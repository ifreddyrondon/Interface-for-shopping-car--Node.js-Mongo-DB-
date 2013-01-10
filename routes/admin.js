var	BD = require('../BD');
	
exports.product = function(req, res){
	if(req.session.user.tipo == 'a'){
		objBD = BD.BD();
		objBD.connect();	
		objBD.query("SELECT ID_Producto, Nombre_Producto, Precio, Cantidad_Inicial, Cantidad_Restante FROM producto",  	
			function(err, rows, fields) {  	
				if (err){
			  	res.write('1');
				  res.end();
			  }
			  else {
				  res.render('user/admin/view_productos', { hola: rows });
			  }
			});
	}
	else
		console.log("No tienes los permisos suficientes");	
}
exports.productCreate = function(req, res){
	if(req.session.user.tipo == 'a'){
		res.render('user/admin/create_product');
	}
	else
		console.log("No tienes los permisos suficientes");	
}