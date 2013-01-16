$(document).ready(function(){
	routie({
		'product': function(){
			picIzq();
			hideUserPanel();
			ajaxNormal("/admin/product");
		},
		'product/create': function(){
			picIzq();
			hideUserPanel();
			ajaxNormal("/admin/product/create");
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
			ajaxDatos("/admin/product/createSend","form-create_product");
		}
		else {
			$(".error_datos_create_product").show();
			return false;
		}
  });
});