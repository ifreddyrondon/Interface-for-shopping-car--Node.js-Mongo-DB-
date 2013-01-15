var pageWindow = $(window);
$(document).ready(function() {
	$(".user_container").css("display","block");
	$("#user_panel_tap").css("display","block");
	$("#user_panel_tap").css("right","135px");
	routie({
		'/*': function(){
			showMenuPpal();
		},
		'': function(){
			showMenuPpal();
		},
		'pic': function() {
			picIzq();
			$("#user_panel_foto_contenido").show();
			$("#user_panel_foto_alt").show();
			$("#user_panel_foto_subir").show();
			$(".customfile").css("width",pageWindow.width()-500);
			$("#user_panel_foto_contenido").css("width",pageWindow.width()-400);
			$(".user_container").css("width",pageWindow.width()-90);
			$("#logout").hide();
			$("#user_panel_contenido").hide();
			$("#user_panel_picture_atras").show();
			$(".big_container").hide();		
			$('#photoimg').customFileInput();
		},
		'datos/:id': function(id){
			picIzq();
			hideUserPanel();
			ajaxNormal("/datos","id="+id);
		},
		'user/datos/update/:id': function(id){
			picIzq();
			hideUserPanel();
			ajaxNormal("/user/datos","id="+id);
		},
		'pass': function(){
			picIzq();
			hideUserPanel();
			ajaxNormal("/user/datos/formpass");
		},
	});
	$("#user_panel_tap_mini").click(function(){
		$(".user_container").show();
		if ($("#logout").css("display") == "none")
			$(".user_container").css("width",pageWindow.width()-90);
		else
			$(".user_container").css("width","235px");
		$("#user_panel_tap_mini").css("padding-left","0px");
		$("#user_panel_tap_mini").css("padding-right","0px");
		$("#user_panel_cerrar_contenedor").show();
		$(".contenido").css("width",pageWindow.width()-494);
		$(".contenido").css("left","0px");		
		$("#user_panel_tap").css("right","135px");
		if($("#user_picture_img_tmp").css("display") != "none"){
			$('#user_panel_foto_upload').imgAreaSelect({  x1: 0, y1: 0, x2: 50 , y2: 50 , aspectRatio: '1:1', handles: true, onSelectChange: preview });
		}
	});	
	//FOTO	
	$("#user_panel_picture_atras_link").click(function(event){
		if ($("#user_picture_save").css("display") == "none"){
      history.back();
		  return false;
		}
		else {
			$('#user_panel_foto_upload').imgAreaSelect({remove: true});
			$("#user_picture_img_tmp").hide();
			$("#user_picture_save").hide();					
			$("#user_panel_foto_subir").show();
			$("#user_picture_img").show();
			$("#user_panel_foto_titulo").show();
			$("#user_panel_foto_after_upload").hide();
			$("#user_picture_info_crop").hide();
			$("#user_panel_foto_alt").show();
		}
	});
	$("#user_panel_cerrar_link").click(function(){
		$(".user_container").hide();
		$("#user_panel_tap_mini").css("padding-left","22px");
		$("#user_panel_tap_mini").css("padding-right","22px");
		$(".contenido").css("width",pageWindow.width()-264);
		$(".contenido").css("left","100px");
		$("#user_panel_tap").css("right","40px");
		$("#user_panel_cerrar_contenedor").hide();
	});
	function showMenuPpal(){
		$(".big_container").hide();
		$(".user_container").css("width","235px");
		$("#user_panel_contenido").show();
		$("#user_panel_picture_atras").hide();
		$("#logout").show();
		$(".contenido").css("width",pageWindow.width()-494);
		$(".contenido").css("left","0px");		
	}
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
	window.hideUserPanel=hideUserPanel;
	window.picIzq=picIzq;
});