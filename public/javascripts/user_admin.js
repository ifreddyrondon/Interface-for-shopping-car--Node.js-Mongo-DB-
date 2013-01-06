$(document).ready(function(){
	routie({
		'product': function(){
			//picIzq();
			//hideUserPanel();
			$.ajax({
      	type: "POST",
				url: "/admin/product",
	      beforeSend: function(){
				 	$("#login_contenedor_loader").show();
				},
        success: function( products ){
	        $("#login_contenedor_loader").hide();
	        alert(products[0]['Nombre_Producto']);
 				}
			});
		},	
	});
});