var	BD = require('../BD')
	,	fs = require('fs')
	, gm = require('gm')
	, imageMagick = gm.subClass({ imageMagick: true })
	, sanitize = require('validator').sanitize
	, check = require('validator').check;
	
var db = BD.mongodb();
var producto_schema = require('../models/producto');
var Producto = db.model('Producto', producto_schema);
	
exports.productCreate = function(req, res){
	if(req.session.user.tipo == 'a'){
		res.render('user/admin/create_product');
	}
	else
		console.log("No tienes los permisos suficientes");	
}
exports.productCreateSend = function(req, res){
	if(req.session.user.tipo == 'a'){
		try {
	    check(req.body.create_product_nombre).notNull();
		  check(req.body.create_product_cantidad_inicial).notNull().isInt();
		  check(req.body.create_product_peso).notNull().isFloat();
		  check(req.body.create_product_tamano).notNull().isFloat();
		  check(req.body.create_product_precio).notNull().isFloat();
		  check(req.body.create_product_descripcion).notNull();
		  
			nombre_producto = sanitize(req.body.create_product_nombre).xss();
			nombre_producto = sanitize(nombre_producto).entityDecode();
			
			cantidad_inicial = sanitize(req.body.create_product_cantidad_inicial).trim(); 	
			cantidad_inicial = sanitize(cantidad_inicial).xss();
			cantidad_inicial = sanitize(cantidad_inicial).entityDecode();
			
			peso_producto = sanitize(req.body.create_product_peso).trim(); 	
			peso_producto = sanitize(peso_producto).xss();
			peso_producto = sanitize(peso_producto).entityDecode();
			
			tamano_producto = sanitize(req.body.create_product_tamano).trim(); 	
			tamano_producto = sanitize(tamano_producto).xss();
			tamano_producto = sanitize(tamano_producto).entityDecode();
			
			precio_producto = sanitize(req.body.create_product_precio).trim(); 	
			precio_producto = sanitize(precio_producto).xss();
			precio_producto = sanitize(precio_producto).entityDecode();
			
			descripcion_producto = sanitize(req.body.create_product_descripcion).xss();
			descripcion_producto = sanitize(descripcion_producto).entityDecode();
			
			var producto = new Producto({
	    	titulo						: 	nombre_producto,
			  summary						: 	nombre_producto,
			  descripcion				:		descripcion_producto,
			  precio						: 	precio_producto,
			  peso							: 	peso_producto,
			  tamano						: 	tamano_producto,
			  cantidad_inicial	:  	cantidad_inicial,
			  cantidad_restante	:  	cantidad_inicial,
	    });
			producto.save(function(err,room) {
	    	if (err) res.send('1');
			  else {			  	
			  	tmp_path = req.files.photoimg_product.path;
			  	if (req.files.photoimg_product.size > 2097152)	res.send('1');
					else{		
				    target_path = "public/images/products/"+room.id;
				    fs.rename(tmp_path, target_path+".1.jpg", function(err) {
				        if (err)	res.send('1');
				        else {
					        fs.unlink(tmp_path, function() {
						        if (err) res.send('1');      
					          else {
					          	imageMagick(target_path+".1.jpg")
									  	.resize(300,300)
									  	.write(target_path+".1.big.jpg", function (err) {
											  if (err) res.send('1'); 
											  else {
											  	imageMagick(target_path+".1.big.jpg")
											  	.resize(90,90)
											  	.write(target_path+".1.min.jpg", function (err) {
													  if (err) res.send('1'); 
													  else {	
									          	imageMagick(target_path+".1.big.jpg")
													  	.resize(50,50)
													  	.write(target_path+".1.micro.jpg", function (err) {
															  if (err) res.send('1'); 
															  else {
															  	producto.images = room.id+".1";
															  	producto.save(function(err,room) {
															    	if (err) res.send('1');
																	  else {
																		  fs.chmodSync(target_path+".1.big.jpg", 0777);
													          	fs.chmodSync(target_path+".1.min.jpg", 0777);
													          	fs.chmodSync(target_path+".1.micro.jpg", 0777);
													          	res.send('/#product/view/'+room.id+'');
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
				    });
				   }	
				}
			});
		} catch (e) {
		  res.send('1');
		  console.log(e.message);
		}	  
	}
	else
		res.send('1');
}
exports.productEditar = function(req, res){
	if(req.session.user.tipo == 'a'){
		if(req.body.id){
			id = sanitize(req.body.id).trim();
			id = sanitize(id).xss();
			id = sanitize(id).entityDecode();
			
			Producto.findById(id, function(err, producto) {
	 	  	if(err) res.send('1');
	 	  	else{
	 	  		if(producto==null)
		 	  		res.render('user/admin/editar_product');
	 	  		else
		 	  		res.render('user/admin/editar_product', { producto: producto });	
	 	  	}
	    });
		}
		else
		 res.send('1');		
	}
	else
		res.send('1');
}
exports.productEditarSend = function(req, res){
	if(req.session.user.tipo == 'a'){
		try {
	    check(req.body.editar_product_nombre).notNull();
		  check(req.body.editar_product_cantidad_inicial).notNull().isInt();
		  check(req.body.editar_product_cantidad_restante).notNull().isInt();
		  check(req.body.editar_product_peso).notNull().isFloat();
		  check(req.body.editar_product_tamano).notNull().isFloat();
		  check(req.body.editar_product_precio).notNull().isFloat();
		  check(req.body.editar_product_descripcion).notNull();
		  
		  id = sanitize(req.body.editar_id_producto).trim(); 	
			id = sanitize(id).xss();
			id = sanitize(id).entityDecode();
		  
			nombre_producto = sanitize(req.body.editar_product_nombre).xss();
			nombre_producto = sanitize(nombre_producto).entityDecode();
			
			cantidad_inicial = sanitize(req.body.editar_product_cantidad_inicial).trim(); 	
			cantidad_inicial = sanitize(cantidad_inicial).xss();
			cantidad_inicial = sanitize(cantidad_inicial).entityDecode();
			
			cantidad_restante = sanitize(req.body.editar_product_cantidad_restante).trim(); 	
			cantidad_restante = sanitize(cantidad_inicial).xss();
			cantidad_restante = sanitize(cantidad_inicial).entityDecode();
			
			peso_producto = sanitize(req.body.editar_product_peso).trim(); 	
			peso_producto = sanitize(peso_producto).xss();
			peso_producto = sanitize(peso_producto).entityDecode();
			
			tamano_producto = sanitize(req.body.editar_product_tamano).trim(); 	
			tamano_producto = sanitize(tamano_producto).xss();
			tamano_producto = sanitize(tamano_producto).entityDecode();
			
			precio_producto = sanitize(req.body.editar_product_precio).trim(); 	
			precio_producto = sanitize(precio_producto).xss();
			precio_producto = sanitize(precio_producto).entityDecode();
			
			descripcion_producto = sanitize(req.body.editar_product_descripcion).xss();
			descripcion_producto = sanitize(descripcion_producto).entityDecode();
			
			Producto.findById(id, function(err, producto) {
	 	  	if(err) res.send('1');
	 	  	else{
	 	  		if(producto==null)
		 	  		res.send('1');		
	 	  		else{
		 	  		producto.titulo = nombre_producto;
		 	  		producto.descripcion = descripcion_producto;
		 	  		producto.precio = precio_producto;
		 	  		producto.peso = peso_producto;
		 	  		producto.tamano = tamano_producto;
		 	  		producto.cantidad_inicial = cantidad_inicial;
		 	  		producto.cantidad_restante = cantidad_restante;
		 	  		
		 	  		producto.save(function(err,room) {
				    	if (err) res.send('1');
						  else{
						  	if(req.files.photoimg_product_edit){
							  	tmp_path = req.files.photoimg_product_edit.path;
							  	if (req.files.photoimg_product_edit.size > 2097152)	res.send('1');
									else{
										target_path = "public/images/products/"+room.id+"."+(room.images.length+1);
										fs.rename(tmp_path, target_path+".jpg", function(err) {
							        if (err)	res.send('1');
							        else {
								        fs.unlink(tmp_path, function() {
									        if (err) res.send('1');      
								          else {
								          	imageMagick(target_path+".jpg")
												  	.resize(300,300)
												  	.write(target_path+".big.jpg", function (err) {
														  if (err) res.send('1'); 
														  else {
														  	imageMagick(target_path+".big.jpg")
														  	.resize(90,90)
														  	.write(target_path+".min.jpg", function (err) {
																  if (err) res.send('1'); 
																  else {	
												          	imageMagick(target_path+".big.jpg")
																  	.resize(50,50)
																  	.write(target_path+".micro.jpg", function (err) {
																		  if (err) res.send('1'); 
																		  else {
																		  	producto.images.push(room.id+"."+(room.images.length+1));
																		  	producto.save(function(err,room) {
																		    	if (err) res.send('1');
																				  else {
																					  fs.chmodSync(target_path+".big.jpg", 0777);
																          	fs.chmodSync(target_path+".min.jpg", 0777);
																          	fs.chmodSync(target_path+".micro.jpg", 0777);
																          	res.send('/#product/view/'+room.id+'');
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
								    });
									}
						  	}
						  	else	res.send('/#product/view/'+room.id+'');	
						  }
						});
	 	  		}
	 	  	}
	    });
			
			} catch (e) {
		  res.send('1');
		  console.log(e.message);
		}
	}
	else
		res.send('1');
}
exports.productEditarDeleteImg = function(req, res){
	if(req.session.user.tipo == 'a'){
		if(req.body.id){
			id = sanitize(req.body.id).trim();
			id = sanitize(id).xss();
			id = sanitize(id).entityDecode();
			idProducto = id.split('.');
			Producto.findById(idProducto[0], function(err, producto) {
	 	  	if(err) res.send('1');
	 	  	else{
	 	  		if(producto==null)	res.send('1');		
	 	  		else{
	 	  			fs.unlink("public/images/products/"+id+".micro.jpg", function() {
							if (err) res.send('1');      
							else {
								fs.unlink("public/images/products/"+id+".min.jpg", function() {
									if (err) res.send('1');      
									else {
										fs.unlink("public/images/products/"+id+".big.jpg", function() {
											if (err) res.send('1');      
											else {
												fs.unlink("public/images/products/"+id+".jpg", function() {
													if (err) res.send('1');      
													else {
														producto.images.remove(id);
									 	  			producto.save(function(err,room) {
												    	if (err) res.send('1');
														  else	res.send('/#product/editar/'+room.id);	
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
	 	  	}
	 	  });
		}
		else
		 res.send('1');		
	}
	else
		res.send('1');
}