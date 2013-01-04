$(document).ready(function(){
	routie({
		'product': function(){
			//picIzq();
			hideUserPanel();
			$.ajax({
      	type: "POST",
				url: "/admin/product",
	      beforeSend: function(){
				 	$("#login_contenedor_loader").show();
				},
        success: function( products ){
	        $("#login_contenedor_loader").hide();
	       // console.log(products[0]['Nombre_Producto']);
 				}
			});
		},	
	});
});