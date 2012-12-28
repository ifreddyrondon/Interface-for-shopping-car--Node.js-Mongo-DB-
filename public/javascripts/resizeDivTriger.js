$(window).load(function(){    
	var pageWindow = $(window);
	var windowDiv = $("#windowDiv");
	var contenido = $(".contenido");
	var login = $("#login");
	var registrar = $("#registrar");
	
  	pageWindow.resize(function adjustWindowDivDimensions() {
		windowDiv.css("width",pageWindow.width()-60);
		contenido.css("height",pageWindow.height()-40);
		login.css("height",pageWindow.height()-50);
		registrar.css("height",pageWindow.height()-50);
		//Registrar y login
		if ($("#login").css("display") == "none" && $("#registrar").css("display") == "none"){
			contenido.css("width",pageWindow.width()-264);
			contenido.css("left","100px");
		}
		else if($("#login").css("display") == "block" || $("#registrar").css("display") == "block"){
			contenido.css("width",pageWindow.width()-494);
			contenido.css("left","0px");
		}
		//Ampliar login para editar la foto
		if ($("#user_panel_picture_atras").css("display") != "none"){
			$(".user_container").css("width",pageWindow.width()-90);
			$("#user_panel_foto_contenido").css("width",pageWindow.width()-400);
		}
		sizePicture();
				
    }).trigger("resize");
});

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