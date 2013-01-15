$(document).ready(function() {
	var correo_disponibilidad = 0;
	$("#update_correo").focus(function(){
		var correo_old = $("#update_correo").val();
	});
	$(document).on("blur", "#update_correo", function() { validator("CorreoAvailability",$(this).attr('id'))  });
	$(document).on("click", "#btn_update_enviar", function(){
		if(validator("CorreoAvailability","update_correo")==false){
			$("#registrar_error").show();	
			return false;
		}
		else {
			$("#registrar_error").hide();	
			ajaxDatosReload("/user/datos/update","form-update");
		}
	});
	$(document).on("blur","#old_pass_temp",function(){validator("empty,min",$(this).attr('id'),6)});
	$(document).on("blur","#new_pass_temp",function(){validator("empty,min",$(this).attr('id'),6)});
	$(document).on("blur","#repeat_new_pass_temp",function(){validator("empty,min",$(this).attr('id'),6)});
	
	$(document).on("click", "#btn_update_pass", function() {
		if(validator("empty","old_pass_temp")==false || validator("empty","new_pass_temp")==false || validator("empty","repeat_new_pass_temp")==false){
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
		      if(datos == '1')
			    	$(".error_clave_error").show(); 
		      if(datos == '2')
			    	$(".error_clave_incorrecta").show(); 
		      if(datos == '3')
			    	$(".error_clave_coinciden").show(); 
		      else 
		      	window.location = datos;
				}
			});
		}
	});
});