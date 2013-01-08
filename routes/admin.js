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
				  //res.send(rows);
				  console.log(rows[0]['Nombre_Producto']);
				  res.render('user/admin/view_productos', {locals:{hola: 'edit your blog'}}, function(err, html){
				  //res.render('user/admin/view_productos', {hola: 'edit your blog'}, function(err, html){
					  if (err) console.log(err);
					  else console.log("todo fino en el render");
					});

			  }
			});
	}
	else
		console.log("No tienes los permisos suficientes");	
}