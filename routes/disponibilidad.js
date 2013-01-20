var BD = require('../BD')
	,	sanitize = require('validator').sanitize;

exports.disponibilidad = function(req, res){

	var objBD = BD.BD();
	objBD.connect();
	
	if(req.body.user_data){
		user = sanitize(req.body.user_data).trim(); 	
		user = sanitize(user).xss();
		user = sanitize(user).entityDecode();
		objBD.query("SELECT User FROM persona WHERE User = "+ objBD.escape(user) +"", 
		function(err, rows, fields) {
	    if (err){
				objBD.end();
				res.send('1'); 
			}
	    else {
		    if (rows.length > 0){
					objBD.end();
					res.send('1'); 
				}
		    else{
			  	res.send('0'); 
			  	objBD.end();
		    }	
	    }
	  });
	}
	if(req.body.correo_data){
		correo = sanitize(req.body.correo_data).trim(); 		
		correo = sanitize(correo).xss();
		correo = sanitize(correo).entityDecode();
		objBD.query("SELECT Correo FROM persona WHERE Correo = "+ objBD.escape(correo) +"", 
		function(err, rows, fields) {
	    if (err){
				objBD.end();
				res.send('1'); 
			}
	    else {
		    if (rows.length > 0){
					objBD.end();
					res.send('1'); 
				}
		    else{
			  	res.send('0'); 
			  	objBD.end();
		    }
	    }
	  });
	}
	if(req.body.doc_data){
		doc = sanitize(req.body.doc_data).trim(); 		
		doc = sanitize(doc).xss();
		doc = sanitize(doc).entityDecode();
		objBD.query("SELECT RIF FROM proveedor WHERE RIF = "+ objBD.escape(doc) +"", 
		function(err, rows, fields) {
	    if (err){
				objBD.end();
				res.send('1'); 
			}
	    else {
		    if (rows.length > 0){
					objBD.end();
					res.send('1'); 
				}
		    else{
			  	res.send('0'); 
			  	objBD.end();
		    }
	    }
	  });
	}
};