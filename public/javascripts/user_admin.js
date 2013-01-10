$(document).ready(function(){
	routie({
		'product': function(){
			picIzq();
			hideUserPanel();
			$.ajax({
      	type: "POST",
				url: "/admin/product",
	      beforeSend: function(){
				 	$("#bowlG").show();
				},
        success: function(products){
	        $("#bowlG").hide();
	        $(".big_container").html(products).hide().show();
 				}
			});
		},
		'product/create': function(){
			picIzq();
			hideUserPanel();
			$.ajax({
      	type: "POST",
				url: "/admin/product/create",
	      beforeSend: function(){
				 	$("#bowlG").show();
				},
        success: function(products){
        	if (products == '1'){
	        	alert("error");
        	}
        	else {
		        $("#bowlG").hide();
		        $(".big_container").html(products).hide().show();
	        }
 				}
			});
		},	
	});
	function hideUserPanel(){
		$(".user_container").css("width",pageWindow.width()-90);
		$("#user_panel_foto_contenido").hide();
		$("#user_panel_foto_alt").hide();
		$("#user_panel_foto_subir").hide();
		$(".big_container").show();
		$("#logout").hide();
		$("#user_panel_contenido").hide();
		$("#user_panel_picture_atras").show();
	}
	function picIzq(){
		$("#user_picture_img").css("position","absolute");
		$("#user_picture_img").css("left","18px");
		$("#user_picture_img").css("top","20px");
	}
});