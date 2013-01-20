//----RESIZE----------------------//
$(window).load(function(){    
	var pageWindow = $(window);var windowDiv = $("#windowDiv");var contenido = $(".contenido");
	var user_container = $(".user_container");
	var registrar = $("#registrar");
	
  	pageWindow.resize(function adjustWindowDivDimensions() {
		windowDiv.css("width",pageWindow.width()-60);
		contenido.css("height",pageWindow.height()-40);
		user_container.css("height",pageWindow.height()-50);
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
//----DESTACADO-------------//
$(document).ready(function() {
	routie({
		'product/view/:id': function(id){
			$(".user_container").css("width",$(window).width()-90);
			$("#user_panel_contenido").hide();
			$("#user_picture_img").hide();
			ajaxNormal("/product/view","id="+id);
			//alert(#{producto.titulo});
		},
	});
	$("#start").click(function(){destacadoClick($(this).attr('id'),"women,men,children")});
	$("#women").click(function(){destacadoClick($(this).attr('id'),"start,men,children")});
	$("#men").click(function(){destacadoClick($(this).attr('id'),"start,women,children")});
	$("#children").click(function(){destacadoClick($(this).attr('id'),"start,women,men")});
	
	$("#start").mouseover(function(){$("#start").css("color","#000000")});
	$("#women").mouseover(function(){$("#women").css("color","#000000")});
	$("#men").mouseover(function(){$("#men").css("color","#000000")});
	$("#children").mouseover(function(){$("#children").css("color","#000000")});
	
	$("#start").mouseout(function(){if($("#start_menu").css("display")=="none")$("#start").css("color","#ffffff")});
	$("#women").mouseout(function(){if($("#women_menu").css("display")=="none")$("#women").css("color","#ffffff")});
	$("#men").mouseout(function(){if($("#men_menu").css("display")=="none")$("#men").css("color","#ffffff")});
	$("#children").mouseout(function(){if($("#children_menu").css("display")=="none")$("#children").css("color","#ffffff")});
	
	function destacadoClick(id,otherID){
		$(document.getElementById(id)).css("color","#000000").css("font-weight","bold");
		$(document.getElementById(id+"_menu")).show();
		otherID = otherID.split(',');
		for(i=0;i<otherID.length;i++){
			$(document.getElementById(otherID[i])).css("font-weight","100").css("color","#ffffff");	
			$(document.getElementById(otherID[i]+"_menu")).hide();
		}
	}
	//----Drag&Drop------//
	$(function () {
		$(".ropa_float").draggable({
			revert:true,
			drag:function () {
				$(this).addClass("active");
				$(this).closest("#product").addClass("active");
			},
			stop:function () {
				$(this).removeClass("active").closest("#product").removeClass("active");
				}
		});
		$(".basket").droppable({
			activeClass:"active",
			hoverClass:"hover",
			tolerance:"touch",
			drop:function (event, ui) {	
				var basket = $(this),
				move = ui.draggable,
				itemId = basket.find("[data-id='" + move.attr("data-id") + "']");
				if (itemId.html() != null)
					itemId.find("input").val(parseInt(itemId.find("input").val()) + 1);
				else {
					addBasket(basket, move);
					move.find("input").val(parseInt(move.find("input").val()) + 1);
				}
			}
		});
		function addBasket(basket, move) {
			basket.find("ul").append('<li data-id="' + move.attr("data-id") + '">'
				+ '<span class="name">' + move.find("span").html() + '</span>'
				+ '<input class="count" value="1" type="text">'
				+ '<button class="delete">&#10005;</button>');
		}
		$(".basket ul li button.delete").live("click", function () {
			$(this).closest("li").remove();
		});
	});
});