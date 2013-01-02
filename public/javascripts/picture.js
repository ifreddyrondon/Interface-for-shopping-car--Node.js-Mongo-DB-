var pageWindow = $(window);
$(document).ready(function() {
	head.js("javascripts/jquery.imgareaselect.pack.js","stylesheets/jquery.imgareaselect-0.9.8/css/imgareaselect-animated.css");	
	$('#photoimg').live('change', function(){ 
		var ext = $('#photoimg').val().split('.').pop().toLowerCase(); 	
		if (! (ext && /^(jpg|png|jpeg|gif)$/.test(ext))){  
        	$("#user_panel_foto_error_formato").show();
			$("#user_panel_foto_error_tamaño").hide();
			$("#user_panel_foto_opciones_upload").hide();   
		}
		else { 
			$("#user_panel_foto_error_formato").hide();
			
			if ( $.browser.msie ) {
				$("#user_panel_foto_error_tamaño").hide();
				$("#user_panel_foto_titulo_subir").show();
			   	$("#user_panel_foto_opciones_upload").show();
			   	$("#user_panel_show_before_picture").show(); 
			}
			else {				
				var fileInput = $("#photoimg")[0];
			    var imgbytes = fileInput.files[0].size; // Size returned in bytes.
			    var imgkbytes = Math.round(parseInt(imgbytes)/1024);
			    if (imgkbytes < 2048){
						$("#user_panel_foto_error_tamano").hide();
				    $("#user_panel_foto_titulo_subir").show();
			   	  $("#user_panel_foto_opciones_upload").show();
			   	  $("#user_panel_show_before_picture").show();     
			    }
			   	else {
			   	    $("#user_panel_foto_error_tamano").show();
				    $("#user_panel_foto_opciones_upload").hide();					
			   	}
			}
        }					
	});
	$("#user_panel_foto_facebook").click(function(){
		$("#id_social_network_form").fadeIn();
		$("#id_social_network").val("username de facebook");
		$("#id_social_network_fort").val("f");
	});
	$("#user_panel_foto_twitter").click(function(){
		$("#id_social_network_form").fadeIn();
		$("#id_social_network").val("@ usuario de twitter");
		$("#id_social_network_fort").val("t");
	});
	$("#id_social_network").focus(function(){
		if($("#id_social_network").val()=="username de facebook"){
			$("#id_social_network").val("");
		}
		else if($("#id_social_network").val()=="@ usuario de twitter"){
			$("#id_social_network").val("@");
		}
	});
	$("#id_social_network").blur(function(){	
		if($("#id_social_network").val()=="" || $("#id_social_network").val== null ){
			if($("#id_social_network_fort").val()=="t"){
				$("#id_social_network").val("@ usuario de twitter");
			}
			else if($("#id_social_network_fort").val()=="f"){
				$("#id_social_network").val("username de facebook");
			}
		}
		else if($("#id_social_network").val()=="@"){
			$("#id_social_network").val("@ usuario de twitter");
		}
	});
	$("#id_social_network_boton").click(function(){
		if($("#id_social_network").val()=="@ usuario de twitter" || $("#id_social_network").val()=="username de facebook"){
			$("#user_panel_foto_error_vacio").show();
			return false;	
		}
		else {
			$("#user_panel_foto_error_vacio").hide();	
		}
		$("#socialForm").ajaxForm({
			url: "pictures/SN",
			type: "post",
			beforeSend: function(){
			 	$(".login_contenedor_loader").show();
			},
			success: function( picture_social_network ){
				$("#id_social_network_boton").attr("disabled", true);
				$(".login_contenedor_loader").hide();
				if(picture_social_network == '0'){
					var picture = $('#user_panel_foto_upload_src').val()+".jpg";			
					$("#user_panel_foto_after_upload").html("<img id='user_panel_foto_upload' src='"+ picture +"' onLoad=sizePicture() />");
					$("#user_picture_img_tmp").html("<img id='preview_img' src='"+ picture +"' onLoad=cornersPreviewImg() />");
					$("#user_panel_foto_alt").hide();
					$("#user_picture_img_tmp").show();
					$("#user_picture_save").show();					
					$("#user_panel_foto_subir").hide();
					$("#user_picture_img").hide();
					$("#user_panel_foto_titulo").hide();
					$("#user_panel_foto_after_upload").show();
					$("#user_picture_info_crop_info").show();
					$('#user_panel_foto_upload').imgAreaSelect({  x1: 0, y1: 0, x2: 50 , y2: 50 , aspectRatio: '1:1', handles: true, onSelectChange: preview });
					$("#id_social_network_boton").removeAttr("disabled");
				}
				else if(picture_social_network == '1'){
					$("#user_panel_foto_error_bad").show();
					$("#id_social_network_boton").removeAttr("disabled");
				}
			}
		});
	});
	$("#upload_picture").click(function(){
		$("#user_panel_foto_alt").hide();
		$("#imageform").ajaxForm({  
			url: "/pictures/upload", 
			type: "post",    
			beforeSubmit: function(){
    		$("#user_picture_loaderbar").show();
      },
			success: function( respuesta_picture ){	
				$("#upload_picture").attr("disabled", true);
				$("#user_picture_loaderbar").hide();
				if(respuesta_picture == '0'){	
					var picture = $('#user_panel_foto_upload_src').val()+".jpg";			
					$("#user_panel_foto_after_upload").html("<img id='user_panel_foto_upload' src='"+ picture +"' onLoad=sizePicture() />");
					$("#user_picture_img_tmp").html("<img id='preview_img' src='"+ picture +"' onLoad=cornersPreviewImg() />");
					$("#user_picture_img_tmp").show();
					$("#user_picture_save").show();					
					$("#user_panel_foto_subir").hide();
					$("#user_picture_img").hide();
					$("#user_panel_foto_titulo").hide();
					$("#user_panel_foto_after_upload").show();
					$("#user_picture_info_crop_info").show();
					$('#user_panel_foto_upload').imgAreaSelect({  x1: 0, y1: 0, x2: 50 , y2: 50 , aspectRatio: '1:1', handles: true, onSelectChange: preview });
					$("#upload_picture").removeAttr("disabled");											
				}
				else if(respuesta_picture == '1'){
					$("#user_panel_foto_error_tamaño").show();
					$("#user_panel_foto_opciones_upload").hide();
					$("#upload_picture").removeAttr("disabled");
				}
				else if(respuesta_picture == '2'){
					$("#user_panel_foto_error").show();
				  $("#user_panel_foto_opciones_upload").hide();
					$("#upload_picture").removeAttr("disabled");
				}
			}	
    	}); 
	});
	$("#save_thumb").click(function(){
		if ($(".x1").val()== "" && $(".y1").val()== "" && $(".x2").val()== "" && $(".y2").val()== "" && $(".w").val()== "" && $(".h").val()== ""){
			$("#user_picture_info_crop_how").hide();
			$("#user_picture_info_crop_error").show();
			return false;
		}
		else {
			$("#imageform_coor").ajaxForm({
				type: "post",
				url: "/pictures/save",
				beforeSend: function(){
					$(".login_contenedor_loader").show();
				},
				success: function( respuesta_upload_save ){
					$("#save_thumb").attr("disabled", true);
					$(".login_contenedor_loader").hide();  
					if (respuesta_upload_save == 1){
						$("#user_picture_error_upload").show();	
						$("#save_thumb").removeAttr("disabled");
					}
					else if (respuesta_upload_save == 0){
						window.location = "/";
					}
				}
			});
		}
	});
	$("#delete_thumb").click(function(){
		$("#imageform_coor").ajaxForm({
			type: "post",
			url: "/pictures/delete",
			beforeSend: function(){
				$(".login_contenedor_loader").show();
			},
			success: function( respuesta_upload_del ){
				$("#delete_thumb").attr("disabled", true);
				$(".login_contenedor_loader").hide();  
				if (respuesta_upload_del == 1){
					$("#user_picture_error_upload").show();
					$("#delete_thumb").removeAttr("disabled");
				}
				else if (respuesta_upload_del == 0){
					$('#user_panel_foto_upload').imgAreaSelect({remove: true});
					$("#user_picture_error_upload").hide();
					$("#user_picture_img_tmp").hide();
					$("#user_picture_save").hide();					
					$("#user_panel_foto_subir").show();
					$("#user_picture_img").show();
					$("#user_panel_foto_titulo").show();
					$("#user_panel_foto_after_upload").hide();
					$("#user_picture_info_crop_info").hide();	
					$("#user_panel_foto_alt").show();	
					$("#delete_thumb").removeAttr("disabled");
				}
			}
		});
	});
	$("#default_thumb").click(function(){
		$("#imageform_coor").ajaxForm({
			type: "post",
			url: "/pictures/default",
			beforeSend: function(){
				$(".login_contenedor_loader").show();
			},
			success: function( respuesta_upload_default ){
				$("#default_thumb").attr("disabled", true);
				$(".login_contenedor_loader").hide();  
				if (respuesta_upload_default == 1){
					$("#user_picture_error_upload").show();
					$("#delete_thumb").removeAttr("disabled");
				}
				else if (respuesta_upload_default == 0){
					window.location = "/";
				}
			}
		});
	});
});
//Funciones llamadas
function cornersPreviewImg(){
	$('#preview_img').corner("10px");
}
function sizePicture(){
		var scale= 1;
		var maxWidth= pageWindow.width()-615;
		var maxHeight= pageWindow.height()-130;
		var width = $("#user_panel_foto_upload").width();
		var height = $("#user_panel_foto_upload").height();
		if(scale != 1) {
			width = width*scale;
			height = height*scale;
		}
		var pWidth = 1;
		if(maxWidth != null) {
			pWidth = width/maxWidth;
		}
		var pHeight = 1;
		if(maxHeight != null) {
			pHeight = height/maxHeight;
		}
		var reduce = 1;
		if(pWidth < pHeight) {
			reduce = pHeight;
		} 
		else {
			reduce = pWidth;
		}
		if(reduce < 1) {
			reduce = 1;
		}
		var newWidth = width/reduce;
		var newHeight = height/reduce;
		$("#user_panel_foto_upload").css("height",newHeight);
		$("#user_panel_foto_upload").css("width",newWidth);			
}

function preview(img, selection) {
	var imagen = $('#user_panel_foto_upload');
    var origin_width= imagen.width(); // ancho original. Ej. 800
    var origin_height= imagen.height(); // alto original. Ej: 600
    if (!selection.width || !selection.height)
    	return;
                            
    var scaleX = 200 / selection.width;
    var scaleY = 200 / selection.height;
              
  $('#user_picture_img_tmp img').css({
  	width: Math.round(scaleX * origin_width),
    height: Math.round(scaleY * origin_height),
		marginLeft: -Math.round(scaleX * selection.x1),
		marginTop: -Math.round(scaleY * selection.y1)
	});
	
	$('.x1').val(selection.x1);
	$('.y1').val(selection.y1);
	$('.x2').val(selection.x2);
	$('.y2').val(selection.y2);
	$('.w').val(selection.width);
	$('.h').val(selection.height);
	$('.w_resize').val($("#user_panel_foto_upload").css("width"));
	$('.h_resize').val($("#user_panel_foto_upload").css("height"));
	 
}

//USE //dev_reload_image('#user_panel_foto_upload',$("#user_panel_foto_upload_src").val());
// Changes a image's src
// 1) reloads the current image 
// OR 
// 2) changes the src completely
function dev_reload_image(img_id, new_src) {
	img_id = img_id || '#default_image_id';
    img_id = jQuery(img_id);
    new_src = new_src || '';
    if (img_id) {
    	old_src = jQuery(img_id).attr('src') || '';
        // No change in source we'll have to add random data to the url to refresh the image
    if (new_src == '' || old_src == new_src) {
        if (old_src.indexOf('?') == -1) { 
        	old_src += '?';
        } else {
            old_src += '&';
        }
        old_src += '__rnd=' + Math.random();
        img_id.attr('src', old_src);
        } else {
            img_id.attr('src', new_src);
        }
    }
}