//##########################################
// [ jQuery resizer Plugin ]
// jquery.anagram.resizer.js
// Revision : 1.0.01
// Create : 18 Dec 2011
// Last Update : 21 Jan 2012
// Licensed under the MIT License
// required : jQuery 1.6.1
//==========================================
// Copyright (c) 2012 anagram inc.
// http;//anagram.jp
//##########################################


;(function($) {

	$.extend($.fn, {
		resizer: function(p) {
			
			p = $.extend({
				'target':			this,
				'offsetTop': 		0,
				'offsetRight': 		0,
				'offsetBottom': 	0,
				'offsetLeft': 		0,
				'type':				"fill", // full , fit , fill , raw
				'position':			"absolute" // absolute , fixed
			}, p);
			
			$(this).hide();
			
			$(this).load(loaded);
			
			function loaded( target ){
				
				if ( this ) target = this;
				
				if ( ( $(target).attr("src") == $(target).attr("data-original") && !$(target).prop("ow") && $(target).width() > 200 ) || !$(target).attr("data-original") ) {
					
					if (window.navigator.userAgent.toLowerCase().indexOf('msie') == -1) {
						
						setTimeout(function(target){
							
							$(target).prop("ow",$(target).width());
							$(target).prop("oh",$(target).height());
							
							resizing($(target));
							
							$(target).fadeIn();
							
						},100,this);
					
					} else {
						
						$(target).prop("ow",$(target).width());
						$(target).prop("oh",$(target).height());
						
						resizing($(target));
						
						$(target).fadeIn();
						
					}
					
				} else {
					setTimeout(loaded,100,this);
				}
					
			}
			
			$(this).bind( "resize" , resizingAll );
			
			$(window).resize( resizingAll );
							
			function resizingAll() {
				p.target.each( function(){
					resizing( $(this) );
				} );
			}
							
			function resizing( target ) {
					
					if ( !target.prop("ow") ) return;
					
					var w = $(window).width() - p.offsetRight - p.offsetLeft;
					var h = $(window).height() - p.offsetTop - p.offsetBottom;
					var ow = target.prop("ow");
					var oh = target.prop("oh");
				
					if ( p.type == "raw" ) {
						dw = ow;
						dh = oh;
					}
				
					if ( p.type == "full" ) {
						dw = w;
						dh = h;
					}
					
					if ( p.type == "fit" ) {
						if ( w < h ) {
							if ( ow * ( h / oh ) > w ) {
								dw = w;
								dh = oh * ( w / ow );
							} else {
								dw = ow * ( h / oh );
								dh = h;
							}
						} else {
							if ( oh * ( w / ow ) > h ) {
								dw = ow * ( h / oh );
								dh = h;
							} else {
								dw = w;
								dh = oh * ( w / ow );
							}
						}
					}
					
					if ( p.type == "fill" ) {
						if ( ow > oh ) {
							if ( ow * ( h / oh ) < $(window).width() ) {
								//console.info("fill 1");
								dw = w;
								dh = oh * ( w / ow );
							} else {
								//console.info("fill 2");
								dw = ow * ( h / oh );
								dh = h;
							}
						} else {
							if ( oh * ( w / ow ) < $(window).height() ) {
								//console.info("fill 3");
								dw = ow * ( h / oh );
								dh = h;
							} else {
								//console.info("fill 4");
								dw = w;
								dh = oh * ( w / ow );
							}
						}
					}
					
					dw = Math.floor(dw);
					dh = Math.floor(dh);
					
					var x =  Math.floor(( $(window).width() - dw - p.offsetLeft - p.offsetRight ) / 2);
					var y =  Math.floor(( $(window).height() - dh - p.offsetTop - p.offsetBottom ) / 2);
					
					if ( p.type == "raw" ) { 
						if ( x < 0 ) {
							x = 0;
						}
						if ( y < 0 ) {
							y = 0;
						}
					}
					
					target.parent().css({
						//'z-index':'1',
						'overflow':(p.type=="raw")?'auto':'hidden',
						'position':p.position,
						'left':p.offsetLeft+"px",
						'top':p.offsetTop+"px"
					});
					
					target.parent().width(w);
					target.parent().height(h);
					
					target.css({
						'position':'absolute',
						'left':x+"px",
						'top':y+"px"
					});
		
					target.width(dw);
					target.height(dh);
				
				return true;
				
			};
			
			return this;
			
		}
	});
	
})(jQuery);















