$(document).ready(function() {
	fTest('javascripts/jquery.tipTip.minified','js');
	var correo_disponibilidad = 0;
	$("#update_correo").focus(function(){
		var correo_old = $("#update_correo").val();
	});
	$("#update_correo").blur(function(){
		if(validaCorreo($("#update_correo").val())){
			var correo_data = 'correo_data='+ $('#update_correo').val();
			$.ajax({
				type: "POST",
				url: "/disponibilidad",
				data: correo_data,
				beforeSend: function(){
				  $("#update_correo").css("background","url('images/loader.gif') no-repeat right center");
				  $("#update_correo").css("background-color","#FFFFFF");
				  $("#btn_update_enviar").attr("disabled", true);
				},
				success: function( respuesta_correo ){
					$("#btn_update_enviar").attr("disabled", false);
					if(respuesta_correo == '1'){
						$("#update_correo").css("background","url('images/false.png') no-repeat right center");
						$("#update_correo").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>E-mail no disponible!!</font>"});
						$("#update_correo").css("background-color","#FFFFFF");
						correo_disponibilidad = 1;
					}
					else {
						$("#update_correo").css("background","url('images/check.png') no-repeat right center");
						//$("#update_correo").tipTip({delay: "100", content: "Correcto!!"});
						$("#update_correo").css("background-color","#FFFFFF");
						correo_disponibilidad = 0;
					}
				}
			});			
		}
		else {
			//$("#update_correo").val(correo_old);
			correo_disponibilidad = 1;
			$("#update_correo").css("background","url('images/false.png') no-repeat right center");
			$("#update_correo").css("background-color","#FFFFFF");
//		$("#update_correo").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>E-mail no valido!!</font>"});
		}
	});
	$("#btn_update_enviar").click(function(){
		if(correo_disponibilidad == 1){
			$("#registrar_error").show();	
			return false;
		}
		else {
			$("#registrar_error").hide();	
			$("#form-update").ajaxForm({
				type: "POST",
				url: "/user/datos/update",
				beforeSend: function(){
					 	$("#login_contenedor_loader").show();
				},
				success: function(datos){
					$("#login_contenedor_loader").hide();
		      if(datos == '1'){
			    	alert("PROBLEMA");
		      }
		      else {
		      	window.location = datos;
		      }
				}
			});
		}
	});
	function validaCorreo(correo) {
		var expresion = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		return expresion.test(correo);
	}
});