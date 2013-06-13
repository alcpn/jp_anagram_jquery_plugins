//##########################################
// [ jQuery flipcard Plugin ]
// jquery.anagram.flipcard.js
// Revision : 0.1.00
// Create Date : 1 Jan 2012
// Last Update : 2 Jan 2012
// Licensed under the MIT License
// required : jQuery
//==========================================
// Copyright (c) 2012 anagram inc.
// http;//anagram.jp
//##########################################


;(function($) {

	$.extend($.fn, {
		flipcard: function(p) {
			
			p = $.extend({
				effect:			"flipHorizontal", // flipHorizontal , flipVertical , flipRotation
				trigger:		"hover", // hover , click , button , timer , auto
				button:			"flipButton", // Button Element ID
				interval:		2, // Timer Second 
				perspective:	500,
				zIndex:			500
			}, p);
			
			p.target = $(this);
			
			if ( 
				typeof( document.body.style.backfaceVisibility ) == "undefined" && 
				typeof( document.body.style.webkitBackfaceVisibility ) == "undefined" && 
				typeof( document.body.style.mozBackfaceVisibility ) == "undefined" && 
				typeof( document.body.style.msBackfaceVisibility ) == "undefined"
			) {
				p.support = false;
			} else {
				p.support = true;
			}
			
			$(this).css({
				'position':				'relative',
				'perspective':			p.perspective,
				'-webkit-perspective':	p.perspective,
				'-moz-perspective':		p.perspective,
				'-o-perspective':		p.perspective,
				'-ms-perspective':		p.perspective
			});
			
			$(this).find(".front").css({
				'position':				'absolute',
				'top':					'0',
				'left':					'0',
				'z-index':				p.zIndex,
				'width':				'inherit',
				'height':				'inherit',
				
				'box-sizing':			'border-box',
				'-moz-box-sizing':		'border-box',
				'-webkit-box-sizing':	'border-box',
				'-o-box-sizing':		'border-box',
				'-ms-box-sizing':		'border-box',
				
				'overflow':				'hidden',
				
				'float':				'none',
				
				'transform-style': 		'preserve-3d',
				'backface-visibility': 	'hidden',
				
				'-webkit-transform-style': 'preserve-3d',
				'-webkit-backface-visibility': 'hidden',
	
				'-moz-transform-style': 'preserve-3d',
				'-moz-backface-visibility': 'hidden'
			});
			
			
			$(this).find(".rear").css({
				'position':				'absolute',
				'top':					'0',
				'left':					'0',
				'z-index':				p.zIndex-1,
				'width':				'inherit',
				'height':				'inherit',
				
				'box-sizing':			'border-box',
				'-moz-box-sizing':		'border-box',
				'-webkit-box-sizing':	'border-box',
				'-o-box-sizing':		'border-box',
				'-ms-box-sizing':		'border-box',
				
				'overflow':				'hidden',
				
				'float':				'none',
				
				'transform-style': 		'preserve-3d',
				'backface-visibility': 	'hidden',
				
				'-webkit-transform-style': 'preserve-3d',
				'-webkit-backface-visibility': 'hidden',
	
				'-moz-transform-style': 'preserve-3d',
				'-moz-backface-visibility': 'hidden'
			});
			
			switch( p.effect ) {
				case "flipHorizontal":
					$(this).find(".front").css({
						'transform': 			'rotateY(0deg)',
						'-webkit-transform': 	'rotateY(0deg)',
						'-moz-transform': 		'rotateY(0deg)',
						'-o-transform': 		'rotateY(0deg)',
						'-ms-transform': 		'rotateY(0deg)'
					});
					
					$(this).find(".rear").css({
						'z-index':				p.zIndex-1,
						'transform': 			'rotateY(180deg)',
						'-webkit-transform': 	'rotateY(180deg)',
						'-moz-transform': 		'rotateY(180deg)',
						'-o-transform': 		'rotateY(180deg)',
						'-ms-transform': 		'rotateY(180deg)'
					});
					break;
					
				case "flipVertical":
					$(this).find(".front").css({
						'transform': 			'rotateX(0deg)',
						'-webkit-transform': 	'rotateX(0deg)',
						'-moz-transform': 		'rotateX(0deg)',
						'-o-transform': 		'rotateX(0deg)',
						'-ms-transform': 		'rotateX(0deg)'
					});
					
					$(this).find(".rear").css({
						'z-index':				p.zIndex-1,
						'transform': 			'rotateX(180deg)',
						'-webkit-transform': 	'rotateX(180deg)',
						'-moz-transform': 		'rotateX(180deg)',
						'-o-transform': 		'rotateX(180deg)',
						'-ms-transform': 		'rotateX(180deg)'
					});
					break;
					
				case "flipRotation":
					$(this).find(".front").css({
						'transform': 			'rotateY(0deg) rotateZ(0deg)',
						'-webkit-transform': 	'rotateY(0deg) rotateZ(0deg)',
						'-moz-transform': 		'rotateY(0deg) rotateZ(0deg)',
						'-o-transform': 		'rotateY(0deg) rotateZ(0deg)',
						'-ms-transform': 		'rotateY(0deg) rotateZ(0deg)'
					});
					
					$(this).find(".rear").css({
						'z-index':				p.zIndex-1,
						'transform': 			'rotateY(180deg) rotateZ(180deg)',
						'-webkit-transform': 	'rotateY(180deg) rotateZ(180deg)',
						'-moz-transform': 		'rotateY(180deg) rotateZ(180deg)',
						'-o-transform': 		'rotateY(180deg) rotateZ(180deg)',
						'-ms-transform': 		'rotateY(180deg) rotateZ(180deg)'
					});
					break;
			}
			
			setTimeout(function(){
				p.target.find(".front , .rear").css({
					'transition': '-webkit-transform .4s ease-in-out',
					'-o-transition': '-webkit-transform .4s ease-in-out',
					'-ms-transition': '-webkit-transform .4s ease-in-out',
					'-moz-transition': '-webkit-transform .4s ease-in-out',
					'-webkit-transition': '-webkit-transform .4s ease-in-out'
				});
			},1);
			
			if ( !p.support ) {
				$(this).css({
					'overflow':				'hidden'
				});
				$(this).find(".front").css({
					'top':	'0px'
				});
				$(this).find(".rear").css({
					'top':	'-'+p.target.height()+'px'
				});
			}
			
			/*
			$(this).parent().find(".flip .front").css({
				'-webkit-transform': 'rotateY(180deg)',
				'-moz-transform': 'rotateY(180deg)'
			});
			$(this).parent().find(".flip .rear").css({
				'z-index':				p.zIndex+1,
				'-webkit-transform': 'rotateY(0deg)',
				'-moz-transform': 'rotateY(0deg)'
			});
			*/
			
			/*
			document.body.write('<style>.front{-webkit-transform:rotateY(0deg);} .rear{-webkit-transform:rotateY(180deg)}</style>');
			document.body.write('<style>.flip .front{-webkit-transform:rotateY(180deg);} .flip .rear{-webkit-transform:rotateY(0deg)}</style>');
			*/
			
			//document.body.write('<style>.front{background:red} .rear{background:blue}</style>');
			//document.body.write('<style>.flip .front{background:blue} .flip .rear{background:red}</style>');
			
			switch ( p.trigger ) {
				
				case "hover":
					$(this).css({
						'cursor': 'pointer'
					});
					$(this).hover( flipOn , flipOff );
					break;
				
				case "click":
					$(this).css({
						'cursor': 'pointer'
					});
					$(this).toggle( flipOn , flipOff );
					break;
				
				case "button":
					$(p.button).css({
						'cursor': 'pointer',
						'z-index': p.zIndex+2
					});
					$(p.button).hide();
					$(this).hover(function(){
						$(p.button).fadeIn();
					},function(){
						$(p.button).fadeOut();
					});
					$(p.button).click( toggle );
					break;
				
				case "timer":
					$(this).css({
						'cursor': 'pointer'
					});
					$(this).click( stopTimer );
					$(this).click( toggle );
					p.timerObj = setInterval( toggle , p.interval * 1000 );
					break;
				
				case "auto":
					$(this).css({
						'cursor': 'pointer'
					});
					$(this).click( stopTimer );
					$(this).click( toggle );
					p.timerObj = setTimeout( flipOn , p.interval * 1000 );
					break;
				
				default:
					$('input[type="submit"],input[type="button"]').click(function(e){
						$(this).removeClass('flip');
					});
					break;
					
			}
			
			
			
			
			function stopTimer(){
				
				if ( p.timerObj ) {
					clearInterval( p.timerObj );
					clearTimeout( p.timerObj );
				}
				
			}
			
			function toggle(){
				
				var target = $(this);
				
				if ( target.attr("id") != p.target.attr("id") && ( p.trigger == "button" || p.trigger == "timer" || p.trigger == "auto" ) ) {
					
					target = p.target;
					
				}
				
				if ( target.hasClass("flip") ) {
					flipOff();
				} else {
					flipOn();
				}
				
			}
			
			function flipOn(){
				
				var target = $(this);
				
				if ( target.attr("id") != p.target.attr("id") && ( p.trigger == "button" || p.trigger == "timer" || p.trigger == "auto" ) ) {
					
					target = p.target;
					
					
				}
				
				target.addClass('flip');
				
				switch( p.effect ) {
					
					case "flipHorizontal":
						target.find(".front").css({
							'transform': 			'rotateY(180deg)',
							'-webkit-transform': 	'rotateY(180deg)',
							'-moz-transform': 		'rotateY(180deg)',
							'-o-transform': 		'rotateY(180deg)',
							'-ms-transform': 		'rotateY(180deg)'
						});
						target.find(".rear").css({
							'z-index':				p.zIndex+1,
							'transform':			 'rotateY(0deg)',
							'-webkit-transform': 	'rotateY(0deg)',
							'-moz-transform': 		'rotateY(0deg)',
							'-o-transform': 		'rotateY(0deg)',
							'-ms-transform': 		'rotateY(0deg)'
						});
						break;
						
					case "flipVertical":
						target.find(".front").css({
							'transform': 			'rotateX(180deg)',
							'-webkit-transform': 	'rotateX(180deg)',
							'-moz-transform': 		'rotateX(180deg)',
							'-o-transform': 		'rotateX(180deg)',
							'-ms-transform': 		'rotateX(180deg)'
						});
						
						target.find(".rear").css({
							'z-index':				p.zIndex+1,
							'transform': 			'rotateX(0deg)',
							'-webkit-transform': 	'rotateX(0deg)',
							'-moz-transform': 		'rotateX(0deg)',
							'-o-transform': 		'rotateX(0deg)',
							'-ms-transform': 		'rotateX(0deg)'
						});
						break;
						
					case "flipRotation":
						target.find(".front").css({
							'transform': 			'rotateY(180deg) rotateZ(180deg)',
							'-webkit-transform': 	'rotateY(180deg) rotateZ(180deg)',
							'-moz-transform': 		'rotateY(180deg) rotateZ(180deg)',
							'-o-transform': 		'rotateY(180deg) rotateZ(180deg)',
							'-ms-transform': 		'rotateY(180deg) rotateZ(180deg)'
						});
						
						target.find(".rear").css({
							'z-index':				p.zIndex+1,
							'transform':			 '',
							'transform': 			'rotateY(0deg) rotateZ(0deg)',
							'-webkit-transform': 	'rotateY(0deg) rotateZ(0deg)',
							'-moz-transform': 		'rotateY(0deg) rotateZ(0deg)',
							'-o-transform': 		'rotateY(0deg) rotateZ(0deg)',
							'-ms-transform': 		'rotateY(0deg) rotateZ(0deg)'
						});
						break;
						
				}
				
				if ( !p.support ) {
					target.find(".front").animate({
						'top':	p.target.height()+'px'
					});
					target.find(".rear").animate({
						'top':	'0px'
					});
				}
				
			}
			
			function flipOff(){
				
				var target = $(this);
				
				if ( target.attr("id") != p.target.attr("id") && ( p.trigger == "button" || p.trigger == "timer" || p.trigger == "auto" ) ) {
					
					target = p.target;
					
				}
				
				target.removeClass('flip');
				
				switch( p.effect ) {
					case "flipHorizontal":
						target.find(".front").css({
							'transform': 			'rotateY(0deg)',
							'-webkit-transform': 	'rotateY(0deg)',
							'-moz-transform': 		'rotateY(0deg)',
							'-o-transform': 		'rotateY(0deg)',
							'-ms-transform': 		'rotateY(0deg)'
						});
						
						target.find(".rear").css({
							'z-index':				p.zIndex-1,
							'transform': 			'rotateY(180deg)',
							'-webkit-transform': 	'rotateY(180deg)',
							'-moz-transform': 		'rotateY(180deg)',
							'-o-transform': 		'rotateY(180deg)',
							'-ms-transform': 		'rotateY(180deg)'
						});
						break;
						
					case "flipVertical":
						target.find(".front").css({
							'transform': 			'rotateX(0deg)',
							'-webkit-transform': 	'rotateX(0deg)',
							'-moz-transform': 		'rotateX(0deg)',
							'-o-transform': 		'rotateX(0deg)',
							'-ms-transform': 		'rotateX(0deg)'
						});
						
						target.find(".rear").css({
							'z-index':				p.zIndex-1,
							'transform': 			'rotateX(180deg)',
							'-webkit-transform': 	'rotateX(180deg)',
							'-moz-transform': 		'rotateX(180deg)',
							'-o-transform': 		'rotateX(180deg)',
							'-ms-transform': 		'rotateX(180deg)'
						});
						break;
						
					case "flipRotation":
						target.find(".front").css({
							'transform': 			'rotateY(0deg) rotateZ(0deg)',
							'-webkit-transform': 	'rotateY(0deg) rotateZ(0deg)',
							'-moz-transform': 		'rotateY(0deg) rotateZ(0deg)',
							'-o-transform': 		'rotateY(0deg) rotateZ(0deg)',
							'-ms-transform': 		'rotateY(0deg) rotateZ(0deg)'
						});
						
						target.find(".rear").css({
							'z-index':				p.zIndex-1,
							'transform': 			'rotateY(180deg) rotateZ(180deg)',
							'-webkit-transform': 	'rotateY(180deg) rotateZ(180deg)',
							'-moz-transform': 		'rotateY(180deg) rotateZ(180deg)',
							'-o-transform': 		'rotateY(180deg) rotateZ(180deg)',
							'-ms-transform': 		'rotateY(180deg) rotateZ(180deg)'
						});
						break;
				}
				
				if ( !p.support ) {
					target.find(".front").animate({
						'top':	'0px'
					});
					target.find(".rear").animate({
						'top':	'-'+p.target.height()+'px'
					});
				}
				
			}
			
			
			
			return this;
		}
	});
	
})(jQuery);















