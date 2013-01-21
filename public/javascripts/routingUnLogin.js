$(document).ready(function(){
	var pageWindow = $(window);
	$(".user_container").css("width","235px");
	routie({
		'login': function() {
			$("#registrar_tap_abrir").show();
			$("#registrar_cerrar_contenedor").hide();
			$("#registrar_tap").css("right","258px");	
			doLoginReg("login");
		},
		'registrar': function() {
			$("#login_tap_abrir").show();
			$("#login_cerrar_contenedor").hide();
			$("#login_tap").css("right","258px");
			doLoginReg("registrar");
		},
		'product/view/:id': function(id){
			$(".user_container").hide();
			$("#impress").hide();
			$(".product_unlogin").show();
			ajaxNormal("/product/view","id="+id);
		},
	});
	function doLoginReg(id){
		$(document.getElementById(id)).show();
		$(document.getElementById(id+"_tap_abrir")).hide();
		$(document.getElementById(id+"_cerrar_contenedor")).show();
		$(document.getElementById(id+"_tap")).css("right","135px");
		if(id=="login")	$("#registrar").hide();
		if(id=="registrar")	$("#login").hide();
		$(".contenido").css("width",pageWindow.width()-494);
		$(".contenido").css("left","0px");
		$(".product_unlogin").hide();
		$("#impress").show();
	}
});