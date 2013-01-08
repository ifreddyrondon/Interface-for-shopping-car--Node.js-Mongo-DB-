$(document).ready(function() {
	head.js("javascripts/cryptico/sha512.js","javascripts/jquery.tipTip.minified.js");
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
					$("#bowlG").show();
				},
				success: function(datos){
					$("#bowlG").hide();
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
	$("#old_pass").keypress(function(){
		$("#old_pass").hide();
    $("#old_pass_temp").show();
    $("#old_pass_temp").focus();
    $("#old_pass").val('');		
	});
	$("#old_pass_temp").blur(function(){
		if ($("#old_pass_temp").val()==''){
			$("#old_pass_temp").hide();
      $("#old_pass").show();    	
			$("#old_pass").val('Clave');
		} 			
		if ($("#old_pass_temp").val().length < 6){
			$(".error_clave").show();    			
			$("#old_pass").val('Clave');
		}
	});
	$("#new_pass").keypress(function(){
		$("#new_pass").hide();
    $("#new_pass_temp").show();
    $("#new_pass_temp").focus();
    $("#new_pass").val('');		
	});
	$("#new_pass_temp").blur(function(){
		if ($("#new_pass_temp").val()==''){
			$("#new_pass_temp").hide();
      $("#new_pass").show();    	
			$("#new_pass").val('Nueva clave');
		} 			
		if ($("#new_pass_temp").val().length < 6){
			$(".error_clave").show();    			
			$("#new_pass").val('Nueva clave');
		}
	});
	$("#repeat_new_pass").keypress(function(){
		$("#repeat_new_pass").hide();
    $("#repeat_new_pass_temp").show();
    $("#repeat_new_pass_temp").focus();
    $("#repeat_new_pass").val('');		
	});
	$("#repeat_new_pass_temp").blur(function(){
		if ($("#repeat_new_pass_temp").val()==''){
			$("#repeat_new_pass_temp").hide();
      $("#repeat_new_pass").show();    	
			$("#repeat_new_pass").val('Repita la clave');
		} 			
		if ($("#repeat_new_pass_temp").val().length < 6){
			$(".error_clave").show();    			
			$("#repeat_new_pass").val('Repita la clave');
		}
	});
	$("#btn_update_pass").click(function(){
		if($("#old_pass").val()=='Clave' || $("#new_pass").val()=='Nueva clave' || $("#repeat_new_pass").val()=='Repita la clave'){
			$(".error_clave").hide();    			
			$(".error_clave_faltan").show();	
			return false;
		}
		else if($("#new_pass_temp").val()!=$("#repeat_new_pass_temp").val()){
			$(".error_clave_faltan").hide();	
			$(".error_clave_coinciden").show(); 
			return false;
		}	
		else {
			$(".error_clave").hide();    			
			$(".error_clave_faltan").hide();
			$(".error_clave_coinciden").hide(); 	
			$("#old_pass_temp").val(CryptoJS.SHA512($('#old_pass_temp').val()));
			$("#new_pass_temp").val(CryptoJS.SHA512($('#new_pass_temp').val()));
			$("#repeat_new_pass_temp").val(CryptoJS.SHA512($('#repeat_new_pass_temp').val()));
			$("#form-pass").ajaxForm({
				type: "POST",
				url: "/user/datos/pass",
				beforeSend: function(){
					$("#bowlG").show();
				},
				success: function(datos){
					$("#bowlG").hide();
		      if(datos == '1'){
			    	$(".error_clave_error").show(); 
		      }
		      if(datos == '2'){
			    	$(".error_clave_incorrecta").show(); 
		      }
		      if(datos == '3'){
			    	$(".error_clave_coinciden").show(); 
		      }
		      else {
		      	window.location = datos;
		      }
				}
			});
		}
	});
});