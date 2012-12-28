exports.disponibilidad = function(req, res){
	
	var BD = require('../BD');
	var objBD = BD.BD();
	objBD.connect();

	if(req.body.user_data){
		objBD.query("SELECT User FROM persona WHERE User = "+ objBD.escape(req.body.user_data) +"", 
		function(err, rows, fields) {
	    if (err) throw err;
	    else {
		    if (rows.length > 0){
			    res.write('1');
			    res.end();
		    }
		    else{
			    res.write('0');
			    res.end();
		    }
	    }
	  });
	}
	if(req.body.correo_data){
		objBD.query("SELECT Correo FROM persona WHERE Correo = "+ objBD.escape(req.body.correo_data) +"", 
		function(err, rows, fields) {
	    if (err) throw err;
	    else {
		    if (rows.length > 0){
			    res.write('1');
			    res.end();
		    }
		    else{
			    res.write('0');
			    res.end();
		    }
	    }
	  });
	}
	if(req.body.doc_data){
		objBD.query("SELECT RIF FROM proveedor WHERE RIF = "+ objBD.escape(req.body.doc_data) +"", 
		function(err, rows, fields) {
	    if (err) throw err;
	    else {
		    if (rows.length > 0){
			    res.write('1');
			    res.end();
		    }
		    else{
			    res.write('0');
			    res.end();
		    }
	    }
	  });
	}
};