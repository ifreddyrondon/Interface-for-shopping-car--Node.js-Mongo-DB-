var	BD = require('../BD');
	
exports.product = function(req, res){
	if(req.session.user.tipo == 'a'){
		objBD = BD.BD();
		objBD.connect();	
		objBD.query("SELECT ID_Producto, Nombre_Producto FROM producto",  	
			function(err, rows, fields) {  	
				if (err){
			  	res.write('1');
				  res.end();
			  }
			  else {
				  res.send(rows);
			  }
			});
	}
	else
		console.log("No tienes los permisos suficientes");	
}