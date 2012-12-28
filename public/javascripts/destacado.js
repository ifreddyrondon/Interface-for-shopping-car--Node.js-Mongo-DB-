$(document).ready(function() {
	
	$("#start").click(function(){
		$("#women").css("font-weight","100");
		$("#men").css("font-weight","100");
		$("#children").css("font-weight","100");
		
		$("#start").css("color","#000000");
		$("#women").css("color","#ffffff");
		$("#men").css("color","#ffffff");
		$("#children").css("color","#ffffff");
		
		$("#start_menu").show();
		$("#women_menu").hide();
		$("#men_menu").hide();
		$("#children_menu").hide();		
	});
	$("#start").mouseover(function(){
		$("#start").css("color","#000000");	
	});
	$("#start").mouseout(function(){
		if ($("#start_menu").css("display") == "none"){
			$("#start").css("color","#ffffff");		
		}	
	});
	
	$("#women").click(function(){
		$("#women").css("font-weight","bold");
		$("#men").css("font-weight","100");
		$("#children").css("font-weight","100");
		
		$("#women").css("color","#000000");
		$("#start").css("color","#ffffff");
		$("#men").css("color","#ffffff");
		$("#children").css("color","#ffffff");
		
		$("#women_menu").show();
		$("#start_menu").hide();
		$("#men_menu").hide();
		$("#children_menu").hide();
	});
	$("#women").mouseover(function(){
		$("#women").css("color","#000000");	
	});
	$("#women").mouseout(function(){
		if ($("#women_menu").css("display") == "none"){
			$("#women").css("color","#ffffff");		
		}
	});
	
	$("#men").click(function(){
		$("#men").css("font-weight","bold");
		$("#women").css("font-weight","100");
		$("#children").css("font-weight","100");
		
		$("#men").css("color","#000000");
		$("#start").css("color","#ffffff");
		$("#women").css("color","#ffffff");
		$("#children").css("color","#ffffff");
		
		$("#men_menu").show();
		$("#start_menu").hide();
		$("#women_menu").hide();
		$("#children_menu").hide();			
	});
	$("#men").mouseover(function(){
		$("#men").css("color","#000000");	
	});
	$("#men").mouseout(function(){
		if ($("#men_menu").css("display") == "none"){
			$("#men").css("color","#ffffff");		
		}
	});
	
	$("#children").click(function(){
		$("#children").css("font-weight","bold");
		$("#women").css("font-weight","100");
		$("#men").css("font-weight","100");
	
		$("#children").css("color","#000000");
		$("#start").css("color","#ffffff");
		$("#women").css("color","#ffffff");
		$("#men").css("color","#ffffff");
		
		$("#children_menu").show();
		$("#start_menu").hide();
		$("#women_menu").hide();	
		$("#men_menu").hide();		
	});
	$("#children").mouseover(function(){
		$("#children").css("color","#000000");	
	});
	$("#children").mouseout(function(){
		if ($("#children_menu").css("display") == "none"){
			$("#children").css("color","#ffffff");		
		}
	});
});