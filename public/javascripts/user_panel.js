var pageWindow = $(window);
$(document).ready(function() {
	$(".user_container").css("display","block");
	$("#user_panel_tap").css("display","block");
	$("#user_panel_tap").css("right","135px");
	routie({
		'': function(){
			$(".user_container").css("width","235px");
			$(".contenido").css("width",pageWindow.width()-494);
			$(".contenido").css("left","0px");		
		},
		'pic': function() {
			picIzq();
			$("#user_panel_foto_contenido").show();
			$("#user_panel_foto_alt").show();
			$("#user_panel_foto_subir").show();
			$(".customfile").css("width",pageWindow.width()-500);
			$("#user_panel_foto_contenido").css("width",pageWindow.width()-400);		
			hideUserPanel();
			$('#photoimg').customFileInput();
		},
		'datos/:id': function(id){
			picIzq();
			hideUserPanel();
			$("#btn_update").show();
			$("#update_regresar").hide();
			$("#update_datos").show();
			$("#datosUpdate_container").hide();
			$("#datos_container").show();
			$.ajax({
      	type: "POST",
				url: "/datos",
        data:'id='+id,
	      beforeSend: function(){
				 	$("#login_contenedor_loader").show();
				},
        success: function( datos ){
	        $("#login_contenedor_loader").hide();
	        if(datos == '1'){
		        alert("PROBLEMA");
	        }
        	else {
        		$("#datos_container").hide().html('<br /><br /><table><tr><td class="font"><font size="5">Usuario:</td><td><font size="4">'+datos.user+'</font></td></tr><tr><td class="font"><font size="5">Nombre:</font></td><td><font size="4">'+datos.nombre+'</font></td></tr><tr><td class="font"><font size="5">Email:</font></td><td><font size="4">'+datos.correo+'</font></td></tr><tr><td class="font"><font size="5">Telefono:</font></td><td><font size="4">'+datos.telefono+'</font></td></tr><tr><td class="font"><font size="5">Estado:</font></td><td><font size="4">'+datos.estado+'</font></td></tr><tr><td class="font"><font size="5">Ciudad:</font></td><td><font size="4">'+datos.ciudad+'</font></td></tr><tr><td class="font"><font size="5">Direccion:</font></td><td><font size="4">'+datos.direccion+'</font></td></tr><tr><td class="font"><font size="5">Codigo Postal:</font></td><td><font size="4">'+datos.codigo_postal+'</font></td></tr></table>').show();	
        		$('#datos').show();
					}
				}
			});	
		},
		'user/datos/update/:id': function(id){
			picIzq();
			hideUserPanel();
			$("#datos_container").hide();
			$("#btn_update").show();
			$("#update_datos").hide();
			$("#update_regresar").show();
			$("#datosUpdate_container").show();
			$("#datos_container").hide();
			$.ajax({
      	type: "POST",
				url: "/user/datos",
        data:'id='+id,
	      beforeSend: function(){
				 	$("#login_contenedor_loader").show();
				},
        success: function( datos ){
	        $("#login_contenedor_loader").hide();
        	if(datos){
        		$('#datos').show();
        		$('#update_nombre').val(datos.nombre);
        		$('#update_correo').val(datos.correo);
        		$('#update_phone').val(datos.telefono);
        		$('#update_estado').val(datos.estado);
        		$('#update_ciudad').val(datos.ciudad);
        		$('#update_postal').val(datos.codigo_postal);
        		$('#update_direccion').val(datos.direccion);
					}
				}
			});
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
	$("#user_panel_picture_atras_link").click(function(){
		if ($("#user_picture_save").css("display") == "none"){
			window.location = "/";
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
	function hideUserPanel(){
		$(".user_container").css("width",pageWindow.width()-90);
		$("#impress").hide();	
		$("#logout").hide();
		$("#user_panel_contenido").hide();
		$('#login').corner("left, 8px");
		$("#user_picture_link").hide();
		$("#user_panel_picture_atras").show();
	}
	function picIzq(){
		$("#user_picture_img").css("position","absolute");
		$("#user_picture_img").css("left","18px");
		$("#user_picture_img").css("top","20px");
	}
});