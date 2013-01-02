var pageWindow = $(window);
var user_disponibilidad = 0;
var correo_disponibilidad = 0;
var doc_disponibilidad = 0;

$(document).ready(function() {
	$(".registrar_usuario").click(function(){
    $("#registrar_documento").hide();
    $("#prov_fin").hide();  
    $("#prov_ini").show();  
    $("#user_fin").hide();  
    $("#user_ini").show();
	});
	$(".registrar_proveedor").click(function(){
    $("#registrar_documento").show();  
    $("#prov_fin").show();  
    $("#prov_ini").hide();  
    $("#user_fin").show();  
    $("#user_ini").hide();
	});
	
	//inputs
	$("#registrar_user").focus(function(){
		$("#registrar_user").val('');
		$("#registrar_user").css('color','#000000');
		$("#registrar_user").css("background-color","#FFFFFF");		
		$("#registrar_user").tipTip({delay: "1", activation: "click",content: "<font class='registrar_tip' size='2px'>Id de su cuenta</font>"});			
	});
	$("#registrar_user").blur(function(){
		var valSpaces =$("#registrar_user").val();
		valSpaces = $.trim( valSpaces );
	
		if (valSpaces==''){
			$("#registrar_user").val('Usuario');
			$("#registrar_user").css('color','#bbbbbb');
			$("#registrar_user").css("background","url('images/warning.png') no-repeat right center");
			$("#registrar_user").css("background-color","#FFFFFF");
			$("#registrar_user").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>Debe colocar un Usuario</font>"});
		} 
		else {
			var user_data = 'user_data='+ $('#registrar_user').val();
			$.ajax({
      	type: "POST",
        url: "/disponibilidad",
        data: user_data,
          beforeSend: function(){
	        	$("#registrar_user").css("background","url('images/loader.gif') no-repeat right center");
						$("#registrar_user").css("background-color","#FFFFFF");
						$("#registrar_enviar").attr("disabled", true);
      	  },
          success: function( respuesta_user ){
						$("#registrar_enviar").attr("disabled", false);
            if(respuesta_user == '1'){
							$("#registrar_user").css("background","url('images/false.png') no-repeat right center");
              $("#registrar_user").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>Usuario no disponible!!</font>"});
              $("#registrar_user").css("background-color","#FFFFFF");
              user_disponibilidad = 1;
            }
            else {
            $("#registrar_user").css("background","url('images/check.png') no-repeat right center");
						$("#registrar_user").tipTip({delay: "100", content: "Correcto!!"});
						$("#registrar_user").css("background-color","#FFFFFF");
						user_disponibilidad = 0;
						}
          }
      });			
		}
	});
	$("#registrar_nombre").focus(function(){
		$("#registrar_nombre").val('');
		$("#registrar_nombre").css('color','#000000');
		$("#registrar_nombre").css("background","none");		
		$("#registrar_nombre").css("background-color","#FFFFFF");			 		
	});
	$("#registrar_nombre").blur(function(){
		var valSpaces =$("#registrar_nombre").val();
		valSpaces = $.trim( valSpaces );
	
		if (valSpaces==''){	
			$("#registrar_nombre").val('Nombre completo');
			$("#registrar_nombre").css('color','#bbbbbb');
			$("#registrar_nombre").css("background","url('images/warning.png') no-repeat right center");
			$("#registrar_nombre").css("background-color","#FFFFFF");
			$("#registrar_nombre").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>debe colocar un Nombre</font>"});
		}
		else {
			$("#registrar_nombre").tipTip({delay: "100", content: "Correcto!!"});
		} 		
	});
	$("#registrar_correo").focus(function(){
		$("#registrar_correo").val('');
		$("#registrar_correo").css('color','#000000');
		$("#registrar_correo").css("background","none");		
		$("#registrar_correo").css("background-color","#FFFFFF");  		
	});
	$("#registrar_correo").blur(function(){
		if ($("#registrar_correo").val()==''){
			$("#registrar_correo").val('E-mail');
			$("#registrar_correo").css('color','#bbbbbb');
			$("#registrar_correo").css("background","url('images/warning.png') no-repeat right center");
			$("#registrar_correo").css("background-color","#FFFFFF");
			$("#registrar_correo").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>debe colocar un E-mail</font>"});
		}
		else {
			if(validaCorreo($("#registrar_correo").val())){
				var correo_data = 'correo_data='+ $('#registrar_correo').val();
				$.ajax({
					type: "POST",
					url: "/disponibilidad",
					data: correo_data,
					beforeSend: function(){
					  $("#registrar_correo").css("background","url('images/loader.gif') no-repeat right center");
					  $("#registrar_correo").css("background-color","#FFFFFF");
					  $("#registrar_enviar").attr("disabled", true);
					},
					success: function( respuesta_correo ){
						$("#registrar_enviar").attr("disabled", false);
						if(respuesta_correo == '1'){
							$("#registrar_correo").css("background","url('images/false.png') no-repeat right center");
							$("#registrar_correo").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>E-mail no disponible!!</font>"});
							$("#registrar_correo").css("background-color","#FFFFFF");
							correo_disponibilidad = 1;
						}
						else {
							$("#registrar_correo").css("background","url('images/check.png') no-repeat right center");
							$("#registrar_correo").tipTip({delay: "100", content: "Correcto!!"});
							$("#registrar_correo").css("background-color","#FFFFFF");
							correo_disponibilidad = 0;
						}
					}
				});			
			}
			else {
				$("#registrar_correo").val('E-mail');
				$("#registrar_correo").css("background","url('images/false.png') no-repeat right center");
				$("#registrar_correo").css("background-color","#FFFFFF");
				$("#registrar_correo").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>E-mail no valido!!</font>"});
			}
		}
	});
	$("#registrar_phone").focus(function(){
		$("#registrar_phone").val('');
		$("#registrar_phone").css('color','#000000');
		$("#registrar_phone").css("background","none");		
		$("#registrar_phone").css("background-color","#FFFFFF");
		$("#registrar_phone").tipTip({delay: "1", activation: "click",content: "<font class='registrar_tip' size='-1'>Código de área + Nº. Ej:<br>0212 323-4556 o 0414 123-4567</font>"}); 					 		
	});
	$("#registrar_phone").blur(function(){
		var valSpaces =$("#registrar_phone").val();
		valSpaces = $.trim( valSpaces );
	
		if (valSpaces==''){	
			$("#registrar_phone").val('Telefono');
			$("#registrar_phone").css('color','#bbbbbb');
			$("#registrar_phone").css("background","url('images/warning.png') no-repeat right center");
			$("#registrar_phone").css("background-color","#FFFFFF");
			$("#registrar_phone").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>debe colocar un Telefono</font>"});
		}
		else {
			$("#registrar_phone").tipTip({delay: "100", content: "Correcto!!"});
		} 		
	});
	$("#registrar_documento").focus(function(){
		$("#registrar_documento").tipTip({delay: "1", activation: "click",content: "<font class='registrar_tip' size='-1'>Ingresa tu RIF. Ej: J-1234567</font>"});
		$("#registrar_documento").val('');
		$("#registrar_documento").css('color','#000000');
		$("#registrar_documento").css("background","none");		
		$("#registrar_documento").css("background-color","#FFFFFF");			 		
	});
	$("#registrar_documento").blur(function(){
		var valSpaces =$("#registrar_documento").val();
		valSpaces = $.trim( valSpaces );
	
		if (valSpaces==''){	
			$("#registrar_documento").val('RIF');
			$("#registrar_documento").css('color','#bbbbbb');
			$("#registrar_documento").css("background","url('images/warning.png') no-repeat right center");
			$("#registrar_documento").css("background-color","#FFFFFF");
			$("#registrar_documento").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>debe colocar su RIF</font>"});
		}
		else {
			var doc_firts_letra = $("#registrar_documento").val().substr(0, 2);
			if (doc_firts_letra != 'J-' && doc_firts_letra != 'j-' && doc_firts_letra != 'V-' && doc_firts_letra != 'v-'){
				$("#registrar_documento").val('RIF');
				$("#registrar_documento").css('color','#bbbbbb');
				$("#registrar_documento").css("background","url('images/warning.png') no-repeat right center");
				$("#registrar_documento").css("background-color","#FFFFFF");
				$("#registrar_documento").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>Sintaxis Incorrecta</font>"});
			}
			else {
				doc_verificar();
			}
		} 		
	});
	function doc_verificar(){
			var doc_data = 'doc_data='+ $('#registrar_documento').val().toUpperCase();
			$.ajax({
      	type: "POST",
				url: "/disponibilidad",
        data: doc_data,
	      beforeSend: function(){
    	  	$("#registrar_documento").css("background","url('images/loader.gif') no-repeat right center");
				  $("#registrar_documento").css("background-color","#FFFFFF");
				  $("#registrar_enviar").attr("disabled", true);
        },
        success: function( respuesta_doc ){
					$("#registrar_enviar").attr("disabled", false);
          if(respuesta_doc == '1'){
						$("#registrar_documento").css("background","url('images/false.png') no-repeat right center");
            $("#registrar_documento").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>RIF no disponible!!</font>"});
						$("#registrar_documento").css("background-color","#FFFFFF");
						doc_disponibilidad = 1;
					}
          else {
            $("#registrar_documento").css("background","url('images/check.png') no-repeat right center");
						$("#registrar_documento").tipTip({delay: "100", content: "Correcto!!"});
						$("#registrar_documento").css("background-color","#FFFFFF");
						doc_disponibilidad = 0;
					}
        }
      });
	}
	$("#registrar_pass_temp").focus(function(){
		$("#registrar_pass_temp").hide();
    $("#registrar_pass").show(); 
    $("#registrar_pass").css('color','#000000'); 
		$("#registrar_pass").focus();
		$("#registrar_pass").tipTip({delay: "1", activation: "click",content: "<font class='registrar_tip' size='2px'>La Contraseña debe tener minimo 6 caracteres</font>"}); 				
		$("#registrar_pass").css("background","none");		
		$("#registrar_pass").css("background-color","#FFFFFF");
	});
	$("#registrar_pass").blur(function(){
		var valSpaces =$("#registrar_pass").val();
		valSpaces = $.trim( valSpaces );
	
		if (valSpaces==''){	
			$("#registrar_pass").hide();
      $("#registrar_pass_temp").show();    	
			$("#registrar_pass_temp").val('Contraseña');
			$("#registrar_pass_temp").css('color','#bbbbbb');
			$("#registrar_pass_temp").css("background","url('images/warning.png') no-repeat right center");
			$("#registrar_pass_temp").css("background-color","#FFFFFF");
			$("#registrar_pass_temp").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>debe colocar una Contraseña</font>"});
		}
		else {
			if ($("#registrar_pass").val().length < 6){
				$("#registrar_pass").hide();
	      $("#registrar_pass_temp").show();
				$("#registrar_pass_temp").val('Contraseña');
				$("#registrar_pass_temp").css("background","url('images/false.png') no-repeat right center");
				$("#registrar_pass_temp").css("background-color","#FFFFFF");
				$("#registrar_pass_temp").tipTip({delay: "100", content: "<font class='registrar_tip' size='2px'>La Contraseña debe tener minimo 6 caracteres</font>"});
			}
			else {
				$("#registrar_pass").tipTip({delay: "100", content: "Correcto!!"});
				$("#registrar_pass_temp").val('');
			}
		}
	});
	
	$("#registrar_enviar").click(function(){
		if ($("#registrar_documento").css("display") == "none"){
			if ($('#registrar_user').val() == 'Usuario' || $('#registrar_nombre').val() == 'Nombre' || $('#registrar_apellido').val() == 'Apellido' || $('#registrar_correo').val() == 'E-mail' || $('#registrar_phone').val() == 'Telefono' || $('#registrar_pass_temp').val() == 'Contraseña' || user_disponibilidad > 0 || correo_disponibilidad > 0){
			$("#registrar_error").show();	
			return false;
			}
			else registrar();
		}
		else {
			if ($('#registrar_user').val() == 'Usuario' || $('#registrar_nombre').val() == 'Nombre' || $('#registrar_apellido').val() == 'Apellido' || $('#registrar_correo').val() == 'E-mail' || $('#registrar_phone').val() == 'Telefono' || $('#registrar_pass_temp').val() == 'Contraseña' || $("#registrar_documento").val() == 'RIF' || user_disponibilidad > 0 || correo_disponibilidad > 0 || doc_disponibilidad > 0){
			$("#registrar_error").show();	
			return false;
			}
			else registrar();
		}
	});
	function registrar(){
		$("#registrar_pass").val(CryptoJS.SHA512($('#registrar_pass').val()));
		$("#registrar_error").hide();
		$("#form-reg").ajaxForm({
			type: "POST",
			url: "/registrar",
			success: function( registrar_respuesta ){
				$("#registrar_enviar").attr("disabled", true);
				if(registrar_respuesta == '1'){
					$("#registrar_error_procesamiento").show();	
					$("#registrar_enviar").removeAttr("disabled");
				}
				else {
					$("#registrar_enviar").hide();
					$("#registrar_success").show();
				}
			}
		});
		return false;			
	}
	
	$("#registrar_cerrar_link").click(function(){
		$("#registrar").hide();
		$("#registrar_tap_abrir").show();
		$("#registrar_cerrar_contenedor").hide();
		$(".contenido").css("width",pageWindow.width()-264);
		$(".contenido").css("left","100px");
		$("#login_tap").css("right","140px");
		$("#registrar_tap").css("right","40px");	
	});	 
	
	
});

function validaCorreo(correo) {
	var expresion = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return expresion.test(correo);
}