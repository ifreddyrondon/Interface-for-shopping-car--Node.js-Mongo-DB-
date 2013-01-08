var http_get = require('http-get')
		, gm = require('gm')
		, imageMagick = gm.subClass({ imageMagick: true })
		, fs = require('fs')
		, BD = require('../BD')
		, crypto = require('crypto')
		, sanitize = require('validator').sanitize
		, check = require('validator').check
		, datos;

exports.registrar = function(req, res){
	objBD = BD.BD();
	objBD.connect();
	
	try {
    check(req.body.registrar_documento).notNull().len(3);
	  check(req.body.registrar_user).notNull().len(4, 15);
	  check(req.body.registrar_correo).notNull().len(6, 64).isEmail();
	  check(req.body.registrar_phone).notNull().len(4);
	  check(req.body.registrar_nombre).notNull();
	  check(req.body.registrar_pass).notNull();
	  
		registrar_documento = sanitize(req.body.registrar_documento).trim(); 	
		registrar_documento = sanitize(registrar_documento).xss();
		registrar_documento = sanitize(registrar_documento).entityDecode();
		
		registrar_user = sanitize(req.body.registrar_user).trim(); 	
		registrar_user = sanitize(registrar_user).xss();
		registrar_user = sanitize(registrar_user).entityDecode();
		
		registrar_correo = sanitize(req.body.registrar_correo).trim(); 	
		registrar_correo = sanitize(registrar_correo).xss();
		registrar_correo = sanitize(registrar_correo).entityDecode();
		
		registrar_phone = sanitize(req.body.registrar_phone).trim(); 	
		registrar_phone = sanitize(registrar_phone).xss();
		registrar_phone = sanitize(registrar_phone).entityDecode();
		
		registrar_nombre = sanitize(req.body.registrar_nombre).xss();
		registrar_nombre = sanitize(registrar_nombre).entityDecode();
		
		pass= crypto.createHash('sha256').update(req.body.registrar_pass).digest("hex");
		pass= pass.substr(0,1)+"u"+pass.substr(2,pass.length/2)+"se"+pass.substr(pass.length/2)+"r";
		
		if(registrar_documento == 'RIF'){
			objBD.query("INSERT INTO persona(User,Clave,Correo,Nombre,Telefono,tipo) VALUES ("+objBD.escape(registrar_user)+","+objBD.escape(pass)+","+objBD.escape(registrar_correo)+","+objBD.escape(registrar_nombre)+","+objBD.escape(registrar_phone)+",'u')", 
				function(err, result){
					if (err){
				  	res.write('1');
					  res.end();
				  }
				  else {
					  objBD.query("INSERT INTO usuario(ID_Persona) VALUES ("+result.insertId+")", 
					  	function(err2, result2){
								if (err2){
							  	res.write('1');
								  res.end();
							  }
							  else {
								  objBD.query("INSERT INTO carrito(ID_Usuario) VALUES ("+result2.insertId+")", 
								  	function(err3, result3){
											if (err3){
										  	res.write('1');
											  res.end();
										  }
										  else {
											  objBD.query("INSERT INTO direccion(ID_Persona) VALUES ("+result.insertId+")", 
											  	function(err4, result4){
														if (err4){
													  	res.write('1');
														  res.end();
													  }
													  else {
														  objBD.query("INSERT INTO AuthAssignment(itemname,ID_Persona) VALUES ('usuario',"+result.insertId+")", 
														  	function(err5, result5){
																	if (err5){
																  	res.write('1');
																	  res.end();
																  }
																  else {
																	  res.write('0');
																	  res.end();
																  }
																});
													  }
													});
										  }
										});
							  }
							});
				  }
				});	
		}
		else if(registrar_documento != 'RIF'){
			objBD.query("INSERT INTO persona(User,Clave,Correo,Nombre,Telefono,tipo) VALUES ("+objBD.escape(registrar_user)+","+objBD.escape(pass)+","+objBD.escape(registrar_correo)+","+objBD.escape(registrar_nombre)+","+objBD.escape(registrar_phone)+",'p')", 
				function(err, result){
					if (err){
				  	res.write('1');
					  res.end();
				  }
				  else {
					  objBD.query("INSERT INTO proveedor(ID_Persona,RIF) VALUES ("+result.insertId+","+objBD.escape(registrar_documento)+")", 
					  	function(err2, result2){
								if (err2){
							  	res.write('1');
								  res.end();
							  }
							  else {
								  objBD.query("INSERT INTO direccion(ID_Persona) VALUES ("+result.insertId+")", 
								  	function(err3, result3){
											if (err3){
										  	res.write('1');
											  res.end();
										  }
										  else {
											  objBD.query("INSERT INTO AuthAssignment(itemname,ID_Persona) VALUES ('proveedor',"+result.insertId+")", 
											  	function(err4, result4){
														if (err4){
													  	res.write('1');
														  res.end();
													  }
													  else {
														  res.write('0');
														  res.end();
													  }
													});
										  }
										});
							  }
							});
				  }
				});	
		}
	} catch (e) {
	  res.write('1');
	  res.end();
	  console.log(e.message);
	}	
}
exports.login = function(req, res){
	objBD = BD.BD();
	objBD.connect();
	login_user = sanitize(req.body.login_user).trim(); 	
	login_user = sanitize(login_user).xss();
	login_user = sanitize(login_user).entityDecode();
	if(login_user && req.body.user_pass){
		pass= crypto.createHash('sha256').update(req.body.user_pass).digest("hex");
		pass= pass.substr(0,1)+"u"+pass.substr(2,pass.length/2)+"se"+pass.substr(pass.length/2)+"r";
		
		objBD.query("SELECT ID_Persona, User, tipo FROM persona WHERE User = "+ objBD.escape(login_user) +" AND Clave = "+ objBD.escape(pass) +" OR Correo = "+ objBD.escape(login_user) +" AND Clave = "+ objBD.escape(pass) +"",
		function(err, rows, fields) {
	    if (err) {res.write('2');res.end();}
	    else {
		    if (rows.length == 1){
					if (rows[0]['tipo'] == 'u'){
						objBD.query("SELECT ID_Usuario FROM usuario WHERE ID_Persona = "+ rows[0]['ID_Persona'] +"",
						function(err2, rows2, fields2) {
					    if (err2) {res.write('2');res.end();}
					    else {
					  		objBD.query("SELECT ID_Carrito FROM carrito WHERE ID_Usuario = "+ rows2[0]['ID_Usuario'] +"",  	
					  		function(err3, rows3, fields3) {  	
					    		if (err3) {res.write('2');res.end();}
					    		else {
					    			var user = {
		        						id: rows[0]['ID_Persona'],
		        						id_tipo: rows2[0]['ID_Usuario'],
		        						id_carrito: rows3[0]['ID_Carrito'],
		        						tipo: rows[0]['tipo'],
		        						user: rows[0]['User'],
		        				};
		        				req.session.regenerate(function(){
			        				req.session.user = user;
			        				console.log(req.session.user);
			        				res.write('0');
			        				res.end();
			        			});
					    		}
					    	});
						  }  
					  });							
					}	else if (rows[0]['tipo'] == 'p'){
						objBD.query("SELECT ID_Proveedor FROM proveedor WHERE ID_Persona = "+ rows[0]['ID_Persona'] +"",
						function(err2, rows2, fields2) {
					    if (err2) {res.write('2');res.end();}
					    else {
						  	var user = {
        						id: rows[0]['ID_Persona'],
        						id_tipo: rows2[0]['ID_Proveedor'],
        						tipo: rows[0]['tipo'],
        						user: rows[0]['User'],
        				};
        				req.session.regenerate(function(){
	        				req.session.user = user;
	        				console.log(req.session.user);
	        				res.write('0');
			        		res.end();
	        			});
						  }  
					  });
					} else if (rows[0]['tipo'] == 'a'){
						objBD.query("SELECT ID_Administrador FROM administrador WHERE ID_Persona = "+ rows[0]['ID_Persona'] +"",
						function(err2, rows2, fields2) {
					    if (err2) {res.write('2');res.end();}
					    else {
						  	var user = {
        						id: rows[0]['ID_Persona'],
        						id_tipo: rows2[0]['ID_Administrador'],
        						tipo: rows[0]['tipo'],
        						user: rows[0]['User'],
        				};
        				req.session.regenerate(function(){
	        				req.session.user = user;
	        				console.log(req.session.user);
	        				res.write('0');
			        		res.end();
	        			});
						  }  
					  });
					}
		    }
		    else{res.write('1');res.end();}
	    }
	  }); 
	}
}
exports.logout = function(req, res){
	if (req.session.user){
		req.session.destroy(function(err){
	 	if (err){
		 	res.white('A ocurrido un error, vuelva a intentarlo mas tarde');
	  }
	  else
	  	res.redirect('/');
	  });
	}
}
exports.pictureUpload = function(req, res){
	if (req.session.user){
		tmp_path = req.files.photoimg.path;
		if (req.files.photoimg.size > 2097152){
			res.write('1');
		  res.end();
		}
		else{		
	    target_path = "public/images/user/"+req.session.user.id+".jpg";
	    fs.rename(tmp_path, target_path, function(err) {
	        if (err){
		        res.write('2');
		        res.end();
	        }
	        else {
		        fs.unlink(tmp_path, function() {
			        if (err) {
			      		res.write('2');
			      		res.end();      
		          }
		          else {
		          	fs.chmodSync(target_path, 0777);
			          res.write("0");
			      		res.end();     
		          }
		        });
		      }
	    });
	   }
	}
}
exports.pictureSN = function(req, res){
	if (req.session.user){
		id_social_network_fort = sanitize(req.body.id_social_network_fort).trim(); 	
		id_social_network_fort = sanitize(id_social_network_fort).xss();
		id_social_network_fort = sanitize(id_social_network_fort).entityDecode();

		id_social_network = sanitize(req.body.id_social_network).trim(); 	
		id_social_network = sanitize(id_social_network).xss();
		id_social_network = sanitize(id_social_network).entityDecode();
		
		if(id_social_network_fort=="f")
			url_SN = "http://graph.facebook.com/"+id_social_network+"/picture?type=large";
		else if(req.body.id_social_network_fort=="t")
			url_SN = "http://api.twitter.com/1/users/profile_image?screen_name="+id_social_network.substr(1)+"&size=original";
		path = "public/images/user/"+req.session.user.id+".jpg";
		var options = {url: url_SN};
		http_get.get(options, path, function (error, result) {
		    if (error) {
		        console.error(error);
		        res.write('1');
		        res.end();
		    } else {
		        console.log('File downloaded at: ' + result.file);
		        res.write('0');
		        res.end();
		    }
		});
	}
};
exports.pictureSave = function(req, res){
	if (req.session.user){
		w_resize = sanitize(req.body.w_resize).trim();
		w_resize = sanitize(w_resize).xss();
		w_resize = sanitize(w_resize).entityDecode();
		h_resize = sanitize(req.body.h_resize).trim();
		h_resize = sanitize(h_resize).xss();
		h_resize = sanitize(h_resize).entityDecode();
		w = sanitize(req.body.w).trim();
		w = sanitize(w).xss();
		w = sanitize(w).entityDecode();
		h = sanitize(req.body.h).trim();
		h = sanitize(h).xss();
		h = sanitize(h).entityDecode();
		x1 = sanitize(req.body.x1).trim();
		x1 = sanitize(x1).xss();
		x1 = sanitize(x1).entityDecode();
		y1 = sanitize(req.body.y1).trim();
		y1 = sanitize(y1).xss();
		y1 = sanitize(y1).entityDecode();
		path = "public/images/user/"+req.session.user.id;		
		imageMagick(path+".jpg")
		.resize(w_resize.substr(0, w_resize.length-2), h_resize.substr(0, h_resize.length-2))
		.crop(w, h, x1, y1)
		.write(path+".avatar.jpg", function (err) {
		  if (err) {
		  	console.log(err);
			  res.write('1');
			  res.end();
		  }
		  else {
		  	imageMagick(path+".avatar.jpg")
		  	.resize(200,200)
		  	.write(path+".avatar.jpg", function (err) {
				  if (err) {
				  	console.log(err);
					  res.write('1');
					  res.end();
				  }
				  else {
				  	imageMagick(path+".avatar.jpg")
				  	.resize(28,28)
				  	.write(path+".micro.jpg", function (err) {
						  if (err) {
						  	console.log(err);
							  res.write('1');
							  res.end();
						  }
						  else {
							  res.write('0');
							  res.end();
						  }
						});
				  }
				});
		  }
		});
	}
};
exports.pictureDelete = function(req, res){
	if (req.session.user){
		path = "public/images/user/"+req.session.user.id;		
		fs.unlink(path+".jpg", function (err) {
	  	if (err) {
	  		throw err;
	  		res.write('1');
				res.end();
			}
			else {
				console.log('successfully deleted');	
				res.write('0');
				res.end();
			}
	  });
	}
};
exports.pictureDefault = function(req, res){
	if (req.session.user){
		path = "public/images/user/"+req.session.user.id;		
		fs.unlink(path+".jpg", function (err) {
	  	if (err) {
	  		throw err;
	  		res.write('1');
				res.end();
			}
			else {
				fs.unlink(path+".avatar.jpg", function (err) {
			  	if (err) {
			  		throw err;
			  		res.write('1');
						res.end();
					}
					else {
						fs.unlink(path+".micro.jpg", function (err) {
					  	if (err) {
					  		throw err;
					  		res.write('1');
								res.end();
							}
							else {
								console.log('successfully deleted');	
								res.write('0');
								res.end();
							}
					  });
					}
			  });
			}
	  });
	}
};
exports.datos = function(req, res){
	if (req.session.user){
		objBD = BD.BD();
		objBD.connect();	
		if(req.body.id){
			id = sanitize(req.body.id).trim();
			id = sanitize(id).xss();
			id = sanitize(id).entityDecode();
			if(id == req.session.user.id){
				objBD.query("SELECT Correo, Nombre, Telefono FROM persona WHERE ID_Persona = "+ objBD.escape(id) +"",  	
				function(err, rows, fields) {  	
		  		if (err){
			  		console.log(err);
			  		res.write('1');
						res.end();
		  		}
		  		else {
		  			objBD.query("SELECT Pais, Estado, Ciudad, Direccion, Codigo_Postal FROM direccion WHERE ID_Persona = "+ objBD.escape(id) +"",  	
						function(err2, rows2, fields2) {  	
				  		if (err2) throw err2;	
				  		else {
				  			datos = {
				  					id: req.session.user.id,
				  					user: req.session.user.user,
				  					correo: rows[0]['Correo'], 
										nombre: rows[0]['Nombre'], 
										telefono: rows[0]['Telefono'],
										pais: rows2[0]['Pais'],
										estado: rows2[0]['Estado'],
										ciudad: rows2[0]['Ciudad'],
										direccion: rows2[0]['Direccion'],
		 								codigo_postal: rows2[0]['Codigo_Postal'],
								};			
								res.send(datos);
				  		}
				  	});
		  		}
		  	});
		  }
		  else
		  	console.log("NO ES EL MISMO USUARIO");
		}
		else
			console.log("ID NO EXISTE");
	}
};
exports.datosUpdate = function(req, res){
	if (req.session.user){
		id = sanitize(req.body.id).trim();
		id = sanitize(id).xss();
		id = sanitize(id).entityDecode();
		if(id == req.session.user.id)
			res.send(datos);
		else
		  console.log("NO ES EL MISMO USUARIO");
	}
}
exports.update = function(req, res){
	if (req.session.user){
		objBD = BD.BD();
		objBD.connect();
		
		try {
		  check(req.body.update_correo).notNull().len(6, 64).isEmail();
		  check(req.body.update_phone).notNull().len(4);
		  check(req.body.update_nombre).notNull();
		  check(req.body.update_estado).notNull();
		  check(req.body.update_ciudad).notNull();
		  check(req.body.update_direccion).notNull();
		  check(req.body.update_postal).notNull().isInt();
			
			nombre = sanitize(req.body.update_nombre).xss();
			nombre = sanitize(nombre).entityDecode();
			correo = sanitize(req.body.update_correo).xss();
			correo = sanitize(correo).entityDecode();
			phone = sanitize(req.body.update_phone).xss();
			phone = sanitize(phone).entityDecode();
			edo = sanitize(req.body.update_estado).xss();
			edo = sanitize(edo).entityDecode();
			ciudad = sanitize(req.body.update_ciudad).xss();
			ciudad = sanitize(ciudad).entityDecode();
			postal = sanitize(req.body.update_postal).xss();
			postal = sanitize(postal).entityDecode();
			direccion = sanitize(req.body.update_direccion).xss();
			direccion = sanitize(direccion).entityDecode();
		
			objBD.query("UPDATE persona SET Nombre = "+ objBD.escape(nombre) +", Correo = "+ objBD.escape(correo) +", Telefono = "+ objBD.escape(phone) +" WHERE ID_Persona = "+ objBD.escape(datos.id) +"",  	
				function(err, rows, fields) {  	
					if (err){
						console.log(err);
						res.write('1');
						res.end();
					}
					else{
						objBD.query("UPDATE direccion SET Estado = "+ objBD.escape(edo) +", Ciudad = "+ objBD.escape(ciudad) +", Codigo_Postal = "+ objBD.escape(postal) +", Direccion = "+ objBD.escape(direccion) +"WHERE ID_Persona = "+ objBD.escape(datos.id) +"", 
							function(err, rows, fields) {  	
								if (err){
									console.log(err);
									res.write('1');
									res.end();
								}
								else{
									res.write('/#datos/'+datos.id+'');
									res.end();
								}
						});
					}	
			});
		} catch (e) {
		  res.write('1');
		  res.end();
		  console.log(e.message);
		}
	}
};
exports.pass = function(req, res){
	if (req.session.user){
		pass_old= crypto.createHash('sha256').update(req.body.old_pass_temp).digest("hex");
		pass_old= pass_old.substr(0,1)+"u"+pass_old.substr(2,pass_old.length/2)+"se"+pass_old.substr(pass_old.length/2)+"r";
		objBD = BD.BD();
		objBD.connect();
		objBD.query("SELECT Clave FROM persona WHERE ID_Persona = "+ req.session.user.id +"",
			function(err, rows, fields) {  	
				if (err){
					console.log(err);
					res.write('1');
					res.end();
				}
				else{
					if(rows[0]['Clave']==pass_old){
						if(req.body.new_pass_temp == req.body.repeat_new_pass_temp){
							pass_new= crypto.createHash('sha256').update(req.body.new_pass_temp).digest("hex");
							pass_new= pass_new.substr(0,1)+"u"+pass_new.substr(2,pass_new.length/2)+"se"+pass_new.substr(pass_new.length/2)+"r";
							objBD.query("UPDATE persona SET Clave = "+objBD.escape(pass_new)+" WHERE ID_Persona = "+ req.session.user.id +"", 
								function(err2, rows2, fields2) {  	
									if (err2){
										console.log(err2);
										res.write('1');
										res.end();
									}
									else{
										res.write('/#datos/'+datos.id+'');
										res.end();
									}
							});
						}
						else{
							res.write('3');
							res.end();
						}
					}
					else{
						res.write('2');
						res.end();
					}
				}
		});
	}
};