var pageWindow = $(window);
$(document).ready(function() {
	$(".user_container").css("display","block");
	$("#user_panel_tap").css("display","block");
	$("#user_panel_tap").css("right","135px");
	routie({
		'/*': function(){
			$(".big_container").hide();
			$(".user_container").css("width","235px");
			$("#user_panel_contenido").show();
			$(".contenido").css("width",pageWindow.width()-494);
			$(".contenido").css("left","0px");		
		},
		'': function(){
			$(".big_container").hide();
			$(".user_container").css("width","235px");
			$("#user_panel_contenido").show();
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
			$("#datos_pass").hide();
			$("#update_datos").show();
			$("#update_clave").show();
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
        		$("#datos_container").hide().html('<br /><br /><br /><table cellpadding="4"><tr><td class="font_w"><font size="4">Usuario:</td><td><font size="5">'+datos.user+'</font></td></tr><tr><td class="font_w"><font size="4">Nombre:</font></td><td><font size="5">'+datos.nombre+'</font></td></tr><tr><td class="font_w"><font size="4">Email:</font></td><td><font size="5">'+datos.correo+'</font></td></tr><tr><td class="font_w"><font size="4">Telefono:</font></td><td><font size="5">'+datos.telefono+'</font></td></tr><tr><td class="font_w"><font size="4">Estado:</font></td><td><font size="5">'+datos.estado+'</font></td></tr><tr><td class="font_w"><font size="4">Ciudad:</font></td><td><font size="5">'+datos.ciudad+'</font></td></tr><tr><td class="font_w"><font size="4">Direccion:</font></td><td><font size="5">'+datos.direccion+'</font></td></tr><tr><td class="font_w"><font size="4">Codigo Postal:</font></td><td><font size="5">'+datos.codigo_postal+'</font></td></tr></table>').show();	
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
			$("#datos_pass").hide();
			$("#update_datos").hide();
			$("#update_clave").show();
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
		'pass': function(){
			picIzq();
			hideUserPanel();
			$('#datos').show();
			$("#btn_update").show();
			$("#update_regresar").show();
			$("#datos_pass").show();
			$("#update_datos").show();
			$("#update_clave").hide();
			$("#datosUpdate_container").hide();
			$("#datos_container").hide();
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
			//event.preventDefault();
			//history.back(-1);
			//parent.history.back();
      //return false;
      //location.href = document.referrer;
      history.back();
      //location.refresh();
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
	function hideUserPanel(){
		$(".user_container").css("width",pageWindow.width()-90);
		$(".big_container").show();
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