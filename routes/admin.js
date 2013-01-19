var	BD = require('../BD')
	,	fs = require('fs')
	, gm = require('gm')
	, imageMagick = gm.subClass({ imageMagick: true })
	, sanitize = require('validator').sanitize
	, check = require('validator').check;
	
exports.productCreate = function(req, res){
	if(req.session.user.tipo == 'a'){
		res.render('user/admin/create_product');
	}
	else
		console.log("No tienes los permisos suficientes");	
}
exports.productCreateSend = function(req, res){
	if(req.session.user.tipo == 'a'){
		db = BD.mongodb();
		var producto_schema = require('../models/producto')
  		, Producto = db.model('Producto', producto_schema);
	  
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
				    fs.rename(tmp_path, target_path+".jpg", function(err) {
				        if (err)	res.send('1');
				        else {
					        fs.unlink(tmp_path, function() {
						        if (err) res.send('1');      
					          else {
					          	imageMagick(target_path+".jpg")
									  	.resize(500,500)
									  	.write(target_path+".big.jpg", function (err) {
											  if (err) res.send('1'); 
											  else {
											  	imageMagick(target_path+".big.jpg")
											  	.resize(100,100)
											  	.write(target_path+".min.jpg", function (err) {
													  if (err) res.send('1'); 
													  else {
													  	fs.unlink(target_path+".jpg", function() {
												        if (err) res.send('1');      
											          else {
											          	fs.chmodSync(target_path+".big.jpg", 0777);
											          	fs.chmodSync(target_path+".min.jpg", 0777);
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
				}
			});
		} catch (e) {
		  res.send('1');
		  console.log(e.message);
		}	  
	}
	else
		console.log("No tienes los permisos suficientes");	
}