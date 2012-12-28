// JavaScript Document
function loadCSS(scrPath, callback, context){
	var scrId = 'jsframe_CSS_' + scrPath.replace(/[^a-zA-Z\d_]+/, '');
	if(document.getElementById(scrId)){
		return(false); //ya cargado
	}
	if(!context) var context = this;
 	var d = new Date();
	var script = document.createElement("link");
	script.id = scrId;
	script.setAttribute("rel", "stylesheet");  
	script.setAttribute("type", "text/css");  
	//script.src = 'js/packer.php?scriptJs=' + scrPath+'.js?rnd='+d.getTime(); 
	script.setAttribute("href", scrPath+'.css?rnd='+d.getTime());
	if(script.readyState){ //IE
		script.onreadystatechange = function(){
			if(script.readyState == "loaded" || script.readyState == "complete"){
				script.onreadystatechange = null;
					return((function(cb, ctx){
						return(cb.call(ctx));
					})(callback, context));
			}
		};
	}
	else{
		script.onload = function(){
			return((function(cb, ctx){
				return(cb.call(ctx));
			})(callback, context));
		};
	}
	var h = document.getElementsByTagName("head").length ? document.getElementsByTagName("head")[0] : document.body;
	h.appendChild(script);
}
function loadScript(scrPath, callback, context){
	var scrId = 'jsframe_script_' + scrPath.replace(/[^a-zA-Z\d_]+/, '');
	if(document.getElementById(scrId)){
		return(false); //ya cargado
	}
	if(!context) var context = this;
 	var d = new Date();
	var script = document.createElement('script');
	script.id = scrId;
	script.type = 'text/javascript';
	//script.src = 'js/packer.php?scriptJs=' + scrPath+'.js?rnd='+d.getTime(); 
	script.src = scrPath+'.js?rnd='+d.getTime(); 
	if(script.readyState){ //IE
		script.onreadystatechange = function(){
			if(script.readyState == "loaded" || script.readyState == "complete"){
				script.onreadystatechange = null;
					return((function(cb, ctx){
						return(cb.call(ctx));
					})(callback, context));
			}
		};
	}
	else{
		script.onload = function(){
			return((function(cb, ctx){
				return(cb.call(ctx));
			})(callback, context));
		};
	}
	var h = document.getElementsByTagName("head").length ? document.getElementsByTagName("head")[0] : document.body;
	h.appendChild(script);
}
function loadMethod(method, args, library, type){
	var tempCall = (function (obj, as){
		return(function (){
			eval('obj.' + method + '.apply(obj, as);');
		});
	})(this, args);
	if(!library){
		alert("Can't load " + method);
	}
	if (type == 'js'){
	 	loadScript(library, tempCall, this);
	}
	else if (type == 'css'){
		loadCSS(library, tempCall, this);
	}
}
function fTest(srcload,type){
	return(loadMethod('fTest', arguments, srcload, type));
}