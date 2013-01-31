$(document).ready(function(){
	routie({
		'product/create': function(){
			picIzq();
			hideUserPanel();
			ajaxNormal("/admin/product/create");
		},
		'product/editar/:id': function(id){
			picIzq();
			hideUserPanel();
			ajaxNormal("/admin/product/editar","id="+id);
		},
		'product/delete_img/:id': function(id){
			picIzq();
			hideUserPanel();
			ajaxNormal("/admin/product/delete_img","id="+id,true);
		},
		'product': function(){
			picIzq();
			hideUserPanel();
			ajaxNormal("/productos");
		},	
	});
	$(document).on("blur","#create_product_nombre",function(){validator("empty",$(this).attr('id'))});
	$(document).on("blur","#create_product_cantidad_inicial",function(){validator("empty,number",$(this).attr('id'))});
	$(document).on("blur","#create_product_peso",function(){validator("empty,number",$(this).attr('id'))});
	$(document).on("blur","#create_product_tamano",function(){validator("empty,number",$(this).attr('id'))});
	$(document).on("blur","#create_product_precio",function(){validator("empty,number",$(this).attr('id'))});
	$(document).on("blur","#create_product_descripcion",function(){validator("empty",$(this).attr('id'))});
	$(document).on("change","#photoimg_product",function(){validator("empty,formatImage",$(this).attr('id'))});
	$(document).on("click", "#btn_crear_producto_enviar", function() { //delegar
		if(validator("empty","create_product_nombre") && validator("empty,number","create_product_cantidad_inicial") && validator("empty,number","create_product_peso") && validator("empty,number","create_product_tamano") && validator("empty,number","create_product_precio") && validator("empty","create_product_descripcion") && validator("empty,formatImage","photoimg_product")){
			$(".error_datos_create_product").hide();
			ajaxDatosReload("/admin/product/createSend","form-create_product");
		}
		else {
			$(".error_datos_create_product").show();
			return false;
		}
  });
  $(document).on("blur","#editar_product_nombre",function(){validator("empty",$(this).attr('id'))});
	$(document).on("blur","#editar_product_cantidad_inicial",function(){validator("empty,number",$(this).attr('id'))});
	$(document).on("blur","#editar_product_cantidad_restante",function(){validator("empty,number",$(this).attr('id'))});
	$(document).on("blur","#editar_product_peso",function(){validator("empty,number",$(this).attr('id'))});
	$(document).on("blur","#editar_product_tamano",function(){validator("empty,number",$(this).attr('id'))});
	$(document).on("blur","#editar_product_precio",function(){validator("empty,number",$(this).attr('id'))});
	$(document).on("blur","#editar_product_descripcion",function(){validator("empty",$(this).attr('id'))});
	//$(document).on("change","#photoimg_product_edit",function(){validator("formatImage",$(this).attr('id'))});
	$(document).on("click", "#btn_editar_producto_enviar", function() { //delegar
		if(validator("empty","editar_product_nombre") && validator("empty,number","editar_product_cantidad_inicial")  && validator("empty,number","editar_product_cantidad_restante") && validator("empty,number","editar_product_peso") && validator("empty,number","editar_product_tamano") && validator("empty,number","editar_product_precio") && validator("empty","editar_product_descripcion")){
			$(".error_datos_create_product").hide();
			ajaxDatosReload("/admin/product/editarSend","form-editar_product");
		}
		else {
			$(".error_datos_create_product").show();
			return false;
		}
  });
  $(document).on("hover",".delete_img_edit",function(){
	  //alert("asdas");
  });
});