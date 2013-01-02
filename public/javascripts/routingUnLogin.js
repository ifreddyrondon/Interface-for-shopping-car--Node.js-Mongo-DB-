$(document).ready(function(){
	var pageWindow = $(window);
	$(".user_container").css("width","235px");
	routie({
		'login': function() {
			$("#login").show();
			$("#login_tap_abrir").hide();
			$("#login_cerrar_contenedor").show();
			$("#registrar_tap_abrir").show();
			$("#registrar_cerrar_contenedor").hide();
			$("#registrar").hide();
			$(".contenido").css("width",pageWindow.width()-494);
			$(".contenido").css("left","0px");
			$("#login_tap").css("right","135px");
			$("#registrar_tap").css("right","258px");	
		},
		'registrar': function() {
			$("#registrar").show();
			$("#login").hide();
			$("#registrar_tap_abrir").hide();
			$("#registrar_cerrar_contenedor").show();
			$("#login_tap_abrir").show();
			$("#login_cerrar_contenedor").hide();
			$(".contenido").css("width",pageWindow.width()-494);
			$(".contenido").css("left","0px");
			$("#registrar_tap").css("right","135px");
			$("#login_tap").css("right","258px");
		},
	});
});