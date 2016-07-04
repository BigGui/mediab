$(document).ready(function(){
	$.fn.absolutize = function(){
		return this.each(function(){
			var elem = $(this);
			if (elem.css('position') == 'absolute')
			return elem;
		elem.css("top", elem.offset().top);
		elem.css("left", elem.offset().left);
		elem.css("position", "absolute");
		});
	}
    $(".sidebar-bg").height($("#page-content-wrapper").height()+200);

	$("#head_messages > div").each(function(i,el){
		flashDiv(el);
	})
	$("#head_messages").remove();

	$("#message").on("click", ".close", function(e){
		e.preventDefault();

		$(this).parent().fadeOut();
	});

	setTimeout(function(){$('.tmp').fadeOut();},2000);

	$(document).on("click", ".togglenext", function(e){
		e.preventDefault();
		if (!$(this).next(":hidden").length)
			$(this).next().slideUp();
		else
			$(this).next().slideDown();
	});
	$(document).on("click", ".toggleprev", function(e){
		e.preventDefault();
		if (!$(this).prev(":hidden").length)
		$(this).prev().slideUp();
		else
		$(this).prev().slideDown();
	});
	$(".hideme").hide();

});

function flash(title,message,cssclass,duration){

	$message = $('#message');
	if (!$message.length)
	{
		$message = $('<div id="message">')
		$("body").append($message);
	}
	$('#message').hide();
	// nicely done :)
	$("#message").css({
		'position':'fixed',
		'left':'37px',
		'top': '20px',
		'width':'auto'
	});
	var newDiv = $("<div class='inner_wrapper'>");
	newDiv.prepend('<a class="close" href="#">x</a>'
			+'<div class="title">'+title+'</div>'
			+(typeof message != "undefined" ? '<div class="text">'+message+'</div>': '')
		);
	newDiv.addClass(cssclass);
	$("#message").prepend(newDiv);
	$('#message').fadeIn();
	if (duration == undefined)
		duration = 4000;
	if (duration>0)
		setTimeout(function(){$(newDiv).fadeOut("slow", function(){$(newDiv).remove();})}, duration);
	return true;
}

function flashDiv(el){
	title=$(el).children(".msg-title")[0].innerHTML;
	content=$(el).children(".msg-content")[0].innerHTML;
	cssClasses=$(el).attr('class');
	classList=$(el).attr('class').split(/\s+/);
	duration = 0;
	for (var i = 0; i < classList.length; i++) {
		split = classList[i].split(/-/);
		if (split.length == 2 && split[0] == 'life')
			duration = split[1];
		if (split.length == 2 && split[0] == 'align')
		{
			if (split[1] == 'right')
				cssClasses += ' right-message';
		}
	}
	flash(title, content, cssClasses, duration);
	$(el).remove();
}

function flashSuccess(title,message, duration){
	// by default, fadeOut after 2 sec
	if (duration == undefined)
		duration = 2000;
	flash(title,message,'success',duration);
}
function flashWarning(title,message, duration){
	// by default, fadeOut after 2 sec
	if (duration == undefined)
		duration = 3000;
	flash(title,message,'warning',duration);
}
function flashInfo(title,message, duration){
	// by default, fadeOut after 2 sec
	if (duration == undefined)
		duration = 2000;
	flash(title,message,'info',duration);
}
function flashError(title,message, duration){
	// by default, deactivate fadeOut
	if (duration == undefined)
		duration = 8000;
	flash(title,message,'error',duration);
}
function mainfunc (func){
	this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}

function number_format (number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://getsprink.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +     bugfix by: Howard Yeend
  // +    revised by: Luke Smith (http://lucassmith.name)
  // +     bugfix by: Diogo Resende
  // +     bugfix by: Rival
  // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
  // +   improved by: davook
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Jay Klehr
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Amir Habibi (http://www.residence-mixte.com/)
  // +     bugfix by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +      input by: Amirouche
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: number_format(1234.56);
  // *     returns 1: '1,235'
  // *     example 2: number_format(1234.56, 2, ',', ' ');
  // *     returns 2: '1 234,56'
  // *     example 3: number_format(1234.5678, 2, '.', '');
  // *     returns 3: '1234.57'
  // *     example 4: number_format(67, 2, ',', '.');
  // *     returns 4: '67,00'
  // *     example 5: number_format(1000);
  // *     returns 5: '1,000'
  // *     example 6: number_format(67.311, 2);
  // *     returns 6: '67.31'
  // *     example 7: number_format(1000.55, 1);
  // *     returns 7: '1,000.6'
  // *     example 8: number_format(67000, 5, ',', '.');
  // *     returns 8: '67.000,00000'
  // *     example 9: number_format(0.9, 0);
  // *     returns 9: '1'
  // *    example 10: number_format('1.20', 2);
  // *    returns 10: '1.20'
  // *    example 11: number_format('1.20', 4);
  // *    returns 11: '1.2000'
  // *    example 12: number_format('1.2000', 3);
  // *    returns 12: '1.200'
  // *    example 13: number_format('1 000,50', 2, '.', ' ');
  // *    returns 13: '100 050.00'
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

function number_format (number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ' ' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

function animateSlider(slider,direction) {
		var slideWidth = $(slider).parent().width();
		var current_margin = parseInt($(slider).css("marginLeft"));
		if(direction == "left") {
			if(current_margin >= 0)
				return;
			if (current_margin+slideWidth > 0)
				slideWidth = 0;
			else
				slideWidth = "+="+slideWidth;
			$(slider).animate({marginLeft: slideWidth}, 500);
		} else {
		if(- current_margin > ($(slider).width()-slideWidth))
			return;
				if ( (- current_margin) + slideWidth > $(slider).width())
					slideWidth = "-=" + ($(slider).width() - current_margin)
				else
					slideWidth = "-=" + slideWidth;
					
		$(slider).animate({marginLeft: slideWidth}, 500);
	}
}
function loginBox_addUser(data, show)
{
	console.log("start loginBox");
	var type = data.type;
	var newUser = $("#switchuser-"+type);
	if (!newUser.length)
	{
		newUser = $('<li id="switchuser-'+type+'">')
	}
	newUser.html("<a class='goto "+type+"' href='/"+type+"' target='_blank' >"
			+'<span class="space">'+boards[type]+"</span> "
			+'<span class="userid">'+data.id+'</span>'
			+" - " + data.company
			+' <span class="identity">'+data.firstname+' '+data.lastname+'</span>'
			+'</a>'
			+'<button data-dismiss="modal" class="close logout" type="button">'
			+'<span aria-hidden="true">×</span>'
			+'<span class="sr-only">Logout</span>'
			+'</button>');
	$("#switchUser-list").append(newUser);
	if (show)
	{
		flashSuccess("Connexion réussie", "Connecté en tant que "+ data.firstname +" "+data.lastname);
		$("#login-customers").val("");
		$("#hello-happy-fellow").click();
	}
};

$(document).ready(function(){
	$("#switchuser").hide();
	$(".toggle-switchuser").on("click", function(e){
		e.preventDefault();
		var num_logged = 0;
		// count logged people
		$("#switchuser ul li").each(function(i, el){
			if (!$(el).is(":empty")){
				num_logged++;
			}
		});
		if (num_logged>=1){
			$("#switchuser").toggle();
			if ($("#switchuser:visible")){
				$("#switchuser").css({"left":"auto","top":$("#hello-happy-fellow").offset().top});
			}
		}
	});
	$(document).on("click", "#switchuser .logout", function(e){
		e.preventDefault();
		var item = $(this).parent();
		var logout_link = item.attr("id").split("-")[1];
		logout_link = "/"+logout_link+"/index/logout";
		$.get(logout_link, function(data){
			var title = "Logout "+item.find(".space").text()+" "+item.find(".userid").text();
			var msg = item.find(".identity").text()+" a été déconnecté";
			flashSuccess(title, msg);
			item.remove();
			$("#switchuser").hide();
		});
	});

$.fn.konami = function( options ) {
	var opts, masterKey, controllerCode, code, bIsValid, i, l;
	var opts = $.extend({}, $.fn.konami.defaults, options);
	return this.each(function() {
		masterKey = [38,38,40,40,37,39,37,39,66,65];
		controllerCode = [];
		$( window ).keyup(function( evt ) {
			code = evt.keyCode ? evt.keyCode : evt.which;
			controllerCode.push( code );
			if( 10 === controllerCode.length ) {
				bIsValid = true;
				for( i = 0, l = masterKey.length; i < l; i++ ) {
					if( masterKey[i] !== controllerCode[i] ) {
						bIsValid = false;
					} // end if
				} // end for
				if( bIsValid ) {
					opts.cheat();
				} // end if
				controllerCode = [];
			} // end if
		}); // keyup
	}); // each
}; // opts

$.fn.konami.defaults = {
	cheat: null
};
$( window ).konami({
  cheat: function() {
		alert('Cheat code activated!');
  }
});

if ($(".has-tooltip").length) {
	$(".has-tooltip").tooltip();
	}
});

