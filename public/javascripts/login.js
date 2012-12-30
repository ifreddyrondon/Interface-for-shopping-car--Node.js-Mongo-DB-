fTest('javascripts/cryptico/sha512','js');
var pageWindow = $(window);
$(document).ready(function() {
	
	//inputs
	$("#login_user").focus(function(){
		if($("#login_user").val()=='Usuario o correo')	{
			$("#login_user").css('color','#bbbbbb');
		}
		else {
			$("#login_user").css('color','#000000'); 		
		}
	});
	$("#login_user").keypress(function(){
		if ($("#login_user").val()=='Usuario o correo'){
			$("#login_user").val(''); 
			$("#login_user").css('color','#000000');
		}
	});
	$("#login_user").blur(function(){
		if ($("#login_user").val()==''){
			$("#login_user").val('Usuario o correo');
		} 
		else if($("#login_user").val()=='Usuario o correo')	{
			$("#login_user").css('color','#000000');
		}
	});
	$("#login_pass_temp").focus(function(){
		if($("#login_pass_temp").val()=='Contraseña')	{
			$("#login_pass_temp").css('color','#bbbbbb');
		}		
	});
	$("#login_pass_temp").blur(function(){
		if($("#login_pass_temp").val()=='Contraseña')	{
			$("#login_pass_temp").css('color','#000000');
		}		
	});
	$("#login_pass_temp").keypress(function(){
		$("#login_pass_temp").hide();
		$("#login_pass_temp").val('');
        $("#login_pass").show();
        $("#login_pass").focus();		
	});
	$("#login_pass").blur(function(){
		if ($("#login_pass").val()==''){
			$("#login_pass").hide();
      $("#login_pass_temp").show();    	
			$("#login_pass_temp").val('Contraseña');
			$("#login_pass_temp").css('color','#000000');			
		} 			
	});

	//Validar campos vacios
	$("#login_enviar").click(function(){
		if ($('#login_user').val()== 'Usuario o correo' || $('#login_pass_temp').val()== 'Contraseña'){
			$("#login_error").show();
			$("#login_error_datos").hide();	
			$("#login_success").hide();
			return false;
		}
		else {
			$("#login_error").hide();		
			var login_data = 'login_user='+ $('#login_user').val() + '&user_pass=' + CryptoJS.SHA512($('#login_pass').val());
			$.ajax({
      	type: "POST",
				url: "/login",
        data: login_data,
	      beforeSend: function(){
				 	$("#login_contenedor_loader").show();
				},
        success: function( login_verificar ){
					$("#login_enviar").attr("disabled", true);
					$("#login_contenedor_loader").hide();
					if(login_verificar == '1'){
						$("#login_error_datos").show();
						$("#login_success").hide();
						$("#login_enviar").attr("disabled", false);
					}
					else {	
						window.location = "/";
					}
				}
			});
			return false;
		}
	});
	//Close panel 
	$("#login_cerrar_link").click(function(){
		$("#login").hide();
		$("#login_cerrar_contenedor").hide();
		$("#login_tap_abrir").show();
		$(".contenido").css("width",pageWindow.width()-264);
		$(".contenido").css("left","100px");
		$("#login_tap").css("right","140px");
		$("#user_panel_tap").css("right","140px");
		$("#registrar_tap").css("right","40px");		
	});	
});
