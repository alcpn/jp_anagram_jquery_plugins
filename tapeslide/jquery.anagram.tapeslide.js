//##########################################
// [ jQuery resizer Plugin ]
// jquery.anagram.tapeslide.js
// Revision : 1.0.05
// Create : 18 Dec 2011
// Last Update : 21 Jan 2012
// Licensed under the MIT License
// require : jQuery 1.6.1
//==========================================
// Copyright (c) 2011-2012 anagram inc.
// http;//anagram.jp
//##########################################


;(function($) {

	$.extend($.fn, {
		tapeslide: function(p) {
			
			jQuery.fx.interval = 1;
			
			p = $.extend({
				'target':		this,
				'interval':		3,
				'speed':		1,
				'buttonsZ':		2,
				'loading':		"",
				'autostart':	true,
				'buttons':		true,
				'buttonsHide':	false,
				'controls':		true,
				'controlsHide':	false,
				'randomize':	true,
				'thumbnail':	"",
				'targetUrl':	"",
				'thumbOnStyle':	{'opacity':1},
				'thumbOffStyle':{'opacity':0.5}
			}, p);
			
			if ( p.autostart ) {
				p.status = "play";
			} else {
				p.status = "stop";
			}
			
			if ( p.thumbnail ) {
				$(p.thumbnail).css({
					'opacity':		p.thumbOffStyle
				});
				$(p.thumbnail).click(function(){
					activate( $(this).get(0).href );
					return false;
				});
			}
			
			if ( p.buttons ) {
				$(this).parent().append($('<div id="tapeslideNextButtonWrapper"><div id="tapeslideNextButton">Next</div></div>'));
				if ( p.buttonsHide ) $('#tapeslideNextButtonWrapper').css({opacity:0});
				$('#tapeslideNextButtonWrapper').css({
					'z-index':p.buttonsZ,
					'user-select':'none',
					'-o-user-select':'none',
					'-moz-user-select':'none',
					'-khtml-user-select':'none',
					'-webkit-user-select':'none'
				});
				$('#tapeslideNextButtonWrapper').hover(
					function(){
						$(this).animate({opacity:1});
					},
					function(){
						if ( p.buttonsHide ) $(this).animate({opacity:0.0});
					}
				);
				$('#tapeslideNextButtonWrapper').click(nextSlide);
				
				$(this).parent().append($('<div id="tapeslidePrevButtonWrapper"><div id="tapeslidePrevButton">Prev</div></div>'));
				if ( p.buttonsHide ) $('#tapeslidePrevButtonWrapper').css({opacity:0});
				$('#tapeslidePrevButtonWrapper').css({
					'z-index':p.buttonsZ,
					'user-select':'none',
					'-o-user-select':'none',
					'-moz-user-select':'none',
					'-khtml-user-select':'none',
					'-webkit-user-select':'none'
				});
				$('#tapeslidePrevButtonWrapper').hover(
					function(){
						$(this).animate({opacity:1});
					},
					function(){
						if ( p.buttonsHide ) $(this).animate({opacity:0.0});
					}
				);
				$('#tapeslidePrevButtonWrapper').click(prevSlide);
			}
			
			if ( p.controls ) {
				$(this).parent().append($('<div id="tapeslideControlsWrapper"><div id="tapeslideControls"><div id="tapeslidePlayButton">Play</div></div></div>'));
				if ( p.controlsHide ) $('#tapeslideControlsWrapper').css({opacity:0});
				$('#tapeslideControlsWrapper').css({
					'z-index':p.buttonsZ,
					'user-select':'none',
					'-o-user-select':'none',
					'-moz-user-select':'none',
					'-khtml-user-select':'none',
					'-webkit-user-select':'none'
				});
				$('#tapeslideControlsWrapper').hover(
					function(){
						$(this).animate({opacity:1});
					},
					function(){
						if ( p.controlsHide ) $(this).animate({opacity:0.0});
					}
				);
				$('#tapeslidePlayButton').click(toggle);
			}
			
			$(this).css({
				opacity:0
			});
			
			$(this).load(function(){
				
				if ( $(this).attr("src") == $(this).attr("data-original") || !$(this).attr("data-original") ) {
					$(this).prop("status","ready");
				} else {
					 //$(this).attr("src" , $(this).attr("data-original") );
				}
				
			});
			
			if ( p.randomize ) {
				p.current = Math.floor( Math.random() * $(this).length ) -1;
			} else {
				p.current = $(this).length -1;
			}
			p.last = p.current - 1;
			if ( p.last < 0 ) p.last = $(this).length - 1;
			
			
			preload();
			
			nextSlide();
			
			
			function activate( targetUrl ) {
				
				if ( p.timeoutObject ) clearTimeout( p.timeoutObject );
				
				p.targetUrl = apath(targetUrl);
				
				if ( $( $(p.target).get(p.current) ).prop("status") == "ready" && targetUrl && !p.fading ) {
					$(p.target).each(function(i){
						var thisPath = apath($(this).attr("data-original"));
						
						if ( thisPath == p.targetUrl ) {
							
							$( $(p.target).get(p.current) ).css({'z-index':0});
							$( $(p.target).get(p.current) ).animate({'opacity':0},p.speed*1000,"swing");
							
							p.current = i - 1;
							if ( p.current < 0 ) p.current = $(p.target).length - 1;
					
							preload();
							
							nextSlide();
							
						}
					});
				}
				
			}
			
			function nextSlide() {
				
				if ( p.timeoutObject ) clearTimeout( p.timeoutObject );
				
				var tar = p.current + 1;
				if ( tar >= $(p.target).length ) tar = 0;
				
				if ( $( $(p.target).get(p.current) ).prop("status") == "ready" && $( $(p.target).get(tar) ).prop("status") == "ready" && !p.fading ) {
					
					if ( !p.initFlag ) {
						p.initFlag = true;
						$(p.target).hide();
					}
					
					$( $(p.target).get(p.last) ).parent().show();
					
					if ( $(p.target).length > 1 ) {
					
						p.last = p.current;
						p.current ++;
						if ( p.current >= $(p.target).length ) p.current = 0;
						
						p.fading = true;
							
						$(p.target).css({'z-index':0});
						
						$( $(p.target).get(p.current) ).trigger("resize");
						
						$( $(p.target).get(p.current) ).show();
						$( $(p.target).get(p.current) ).css({'z-index':1});
						
						if ( 
							$( $(p.target).get(p.current) ).width() != $( $(p.target).get(p.last) ).width() ||
							$( $(p.target).get(p.current) ).height() != $( $(p.target).get(p.last) ).height()
						) {
							$( $(p.target).get(p.last) ).animate({'opacity':0},p.speed*1000,"swing");
						}
						
						$( $(p.target).get(p.current) ).animate({'opacity':1},p.speed*1000,"swing",function(){
							
							p.fading = false;
							$( $(p.target).get(p.last) ).css({'opacity':0});
							$( $(p.target).get(p.last) ).parent().css({'background':'none'});
							loaded();
						
						});
						
					} else {
						
						p.fading = true;
						$( $(p.target).get(p.current) ).show();
						$( $(p.target).get(p.current) ).css({'z-index':1});
						$( $(p.target).get(p.current) ).animate({'opacity':1},p.speed*1000,"swing",function(){
							
							p.fading = false;
							loaded();
						
						});
						
					}
					
					updateThumbnail();
					
					preload();
					
					if ( p.status == "play" ) {
						p.timeoutObject = setTimeout(nextSlide,p.interval*1000);
					}
					
				} else {
					
					p.timeoutObject = setTimeout(nextSlide,100);
					
				}
				
				setPlayButton();
				
			}
				
			function loading() {
				if ( p.loading ) {
					p.target.parent().css({'background':'url('+p.loading+') center center no-repeat'});
				}
			}
				
			function loaded() {
				if ( p.loading ) {
					p.target.parent().css({'background':'none'});
				}
			}
			
			function preload() {
				
				var nextImg = p.current + 1;
				if ( nextImg >= $(p.target).length ) nextImg = 0;
				
				var nextImg2 = p.current + 2;
				if ( nextImg2 >= $(p.target).length ) nextImg2 = 0;
				
				var nextImg3 = p.current - 1;
				if ( nextImg3 < 0 ) nextImg3 = $(p.target).length - 1;
				
				if ( 
					$( $(p.target).get(p.current) ).attr("src")
					!= $( $(p.target).get(p.current) ).attr("data-original") )
				{
					$( $(p.target).get(p.current) ).attr("src",$( $(p.target).get(p.current) ).attr("data-original"));
					loading();
				}
				
				if ( 
					$( $(p.target).get(nextImg) ).attr("src")
					!= $( $(p.target).get(nextImg) ).attr("data-original") )
				{
					//$( $(p.target).get(nextImg) ).attr("src","");
					$( $(p.target).get(nextImg) ).attr("src",$( $(p.target).get(nextImg) ).attr("data-original"));
					loading();
				}
				
				if ( 
					$( $(p.target).get(nextImg3) ).attr("src")
					!= $( $(p.target).get(nextImg3) ).attr("data-original") )
				{
					$( $(p.target).get(nextImg3) ).attr("src",$( $(p.target).get(nextImg3) ).attr("data-original"));
					loading();
				}
				
			}
			
			function prevSlide() {
				
				clearTimeout( p.timeoutObject );
				
				var tar = p.current - 1;
				if ( tar < 0 ) tar = $(p.target).length - 1;
				
				if ( $( $(p.target).get(p.current) ).prop("status") == "ready" && $( $(p.target).get(tar) ).prop("status") == "ready" && !p.fading ) {
						
					if ( !p.initFlag ) {
						p.initFlag = true;
						$( $(p.target).get(p.last) ).hide();
					}
					$( $(p.target).get(p.last) ).parent().show();
					
					p.last = p.current;
					p.current --;
					if ( p.current < 0 ) p.current = $(p.target).length - 1;
					
					p.fading = true;
					
					$(p.target).css({'z-index':0});
						
					if ( 
						$( $(p.target).get(p.current) ).width() != $( $(p.target).get(p.last) ).width() ||
						$( $(p.target).get(p.current) ).height() != $( $(p.target).get(p.last) ).height()
					) {
						$( $(p.target).get(p.last) ).animate({'opacity':0},p.speed*1000,"swing");
					}
					
					$( $(p.target).get(p.current) ).show();
					$( $(p.target).get(p.current) ).css({'z-index':1});
					$( $(p.target).get(p.current) ).animate({'opacity':1},p.speed*1000,"swing",function(){
						
						p.fading = false;
						$( $(p.target).get(p.last) ).css({'opacity':0});
					
					});
					
					updateThumbnail();
					
					preload();
					
					if ( p.status == "play" ) {
						p.timeoutObject = setTimeout(nextSlide,p.interval*1000);
					}
					
				} else {
					
					p.timeoutObject = setTimeout(prevSlide,100);
					
				}
				
				setPlayButton();
				
			}
			
			
			function setPlayButton() {
				if ( p.controls ) {
					if ( p.status == "play" ) {
						$('#tapeslidePlayButton').addClass("play");
						$('#tapeslidePlayButton').removeClass("stop");
					} else {
						$('#tapeslidePlayButton').removeClass("play");
						$('#tapeslidePlayButton').addClass("stop");
					}
				}
			}
			
			function stopSlide() {
				p.status = "stop";
				clearTimeout( p.timeoutObject );
				setPlayButton();
			}
			
			function startSlide() {
				p.status = "play";
				nextSlide();
			}
			
			function toggle() {
				if ( p.status == "play" ) {
					stopSlide();
				} else {
					startSlide();
				}
			}
			
			function apath( path ){
				var e = document.createElement('span');
				e.innerHTML = '<a href="' + path + '" />';
				return e.firstChild.href;
			}
			
			function updateThumbnail() {
								
				if ( p.thumbnail ) {
					$(p.thumbnail).each(function(i){
						var thisPath = apath($(this).get(0).href);
						var currentPath = apath($( $(p.target).get(p.current) ).attr("data-original"));
						
						if ( thisPath == currentPath ) {
							$(this).animate(p.thumbOnStyle,500,"swing");
						} else {
							$(this).css(p.thumbOffStyle);
						}
					});
				}
				
			}

			return this;
		}
	});
	
})(jQuery);















