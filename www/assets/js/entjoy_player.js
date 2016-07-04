/*******************************************************************************
 * Entjoy player : used to write Entjoy flash video player into a HTML page
 ******************************************************************************/
 
function entjoy_paramurl( name )
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return results[1];
} 
 
function getURL()
{
	var port =  window.location.port;
	if (port == 80) port = "";
	else port = ":" + port;
	return window.location.protocol +"//" + window.location.hostname + port  + window.location.pathname + window.location.hash;
}

function getEmbedURL()
{
	var port =  window.location.port;
	if (port == 80) port = "";
	else port = ":" + port;
	var pathname = window.location.pathname;
	pathname = pathname.substring(0,pathname.lastIndexOf("/") + 1) + "embed.php";
	return window.location.protocol +"//" + window.location.hostname + port  + pathname + window.location.hash;
}

function writePlayer(player_divName, player_width, player_height, player_wsUrl, player_videoId, player_autoplay, tag_url, page_url, player_sideAd)
{ 
	if(page_url == "")
	{
		page_url = getURL();
	}
	if(typeof player_sideAd == "undefined") var player_sideAd = 0;
	var flashvars = { api_url : player_wsUrl, video_id : player_videoId , autoplay : player_autoplay, sideAd : player_sideAd, skin_url : "medias/player/swf/skin_default.swf", user_ip : user_ip, url : page_url, embed_url:page_url, tag_url:tag_url };
	
  	var params = {allowfullscreen:'true', menu:'false', bgcolor:'#000000', salign:'LT', loop:'true', quality:'high', align:'middle', allowscriptaccess:'always', wmode : 'window' };
  	
  	swfobject.embedSWF('medias/player/player.swf', player_divName, player_width, player_height, '9', 'medias/player/swf/expressInstall.swf', flashvars, params, {id: player_divName});
}

if(typeof player_divName == "undefined") var player_divName = "divPlayer";
if(typeof player_autoplay == "undefined") var player_autoplay = 0;
if(typeof player_width == "undefined") var player_width = 880;
if(typeof player_height == "undefined") var player_height = 496;
if(typeof player_wsUrl == "undefined") var player_wsUrl = "";
if(typeof player_videoId == "undefined") var player_videoId = "";
if(typeof tag_url == "undefined") var tag_url = "";
if(typeof page_url == "undefined") var page_url = "";
if(typeof player_sideAd == "undefined") var player_sideAd = 0;
 
function loadPLayer()
{
	writePlayer(player_divName, player_width, player_height, player_wsUrl, player_videoId, player_autoplay, tag_url, page_url, player_sideAd);
}


function getFlashMovie(movieName) 
{
	  var isIE = navigator.appName.indexOf("Microsoft") != -1;
	  return (isIE) ? window[movieName] : document[movieName];
}

window.onbeforeunload = function() 
{
	var flash = getFlashMovie(player_divName);
	if (flash != 'undefined' && typeof flash != 'undefined' )
		flash.sendToActionscript("close");
}

