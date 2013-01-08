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
				  local_var = "I am a local var";
				  console.log(rows[0]['Nombre_Producto']);
				  console.log(local_var);
				  res.render('user/admin/view_productos',function(err,html){
					  if (err) console.log(err);
					  else res.send(html);
					});

			  }
			});
	}
	else
		console.log("No tienes los permisos suficientes");	
}