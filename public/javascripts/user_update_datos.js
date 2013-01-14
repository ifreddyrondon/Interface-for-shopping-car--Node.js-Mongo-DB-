$(document).ready(function() {
	head.js("javascripts/cryptico/sha512.js","javascripts/jquery.tipTip.minified.js");
	var correo_disponibilidad = 0;
	$("#update_correo").focus(function(){
		var correo_old = $("#update_correo").val();
	});
	$(document).on("blur", "#update_correo", function() { validator("CorreoAvailability",$(this).attr('id'))  });
	
	$("#btn_update_enviar").click(function(){
		if(validator("CorreoAvailability","update_correo")){
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