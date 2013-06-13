//##########################################
// [ jQuery dropdown Plugin ]
// jquery.anagram.dropdown.js
// Revision : 0.1.00
// Create Date : 17 Dec 2011
// Last Update : 2 Jan 2012
// Licensed under the MIT License
// required : jQuery
//==========================================
// Copyright (c) 2012 anagram inc.
// http;//anagram.jp
//##########################################


;(function($) {

	$.extend($.fn, {
		dropdown: function(p) {
			
			p = $.extend({
				target:		$(this).get(0),
				effect:		"fade" // fade , slide , slideX
			}, p);
			
			p.status = false;
			
			$("#"+p.target.id+" ul").hide();
			$("#"+p.target.id+" ol").hide();
			
			$("#"+p.target.id+" li").hover(
				function(e){
				},
				function(){
					switch ( p.effect ) {
						case "fade":
							$(this).find("ul,ol").fadeOut();
							break;
						case "slide":
							$(this).find("ul,ol").slideUp();
							break;
						case "slideX":
							p.status = false;
							$(this).find("ul,ol").animate({
								'opacity': 		'0',
								'margin-left': 	'-20px'
							});
							break;
					}
				}
			);
			
			$("#"+p.target.id+" ol").hover(
				function(e){
					$(this).show();
				}
			);
			
			$("#"+p.target.id+">li>a").hover(
				function(e){
					switch ( p.effect ) {
						case "fade":
							$(this).parent().find("ul,ol").fadeIn();
							break;
						case "slide":
							$(this).parent().find("ul,ol").slideDown();
							break;
						case "slideX":
							if ( !p.status ) {
								p.status = true;
								$(this).parent().find("ul,ol").show();
								$(this).parent().find("ul,ol").css({
									'opacity': 		'0',
									'margin-left': 	'20px'
								});
							}
							$(this).parent().find("ul,ol").animate({
								'opacity': 		'1',
								'margin-left': 	'0px'
							});
							break;
					}
				}
			);
			
			return this;
			
		}
	});
	
})(jQuery);















