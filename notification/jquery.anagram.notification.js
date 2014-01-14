//##########################################
// [ jQuery notification Plugin ]
// jquery.anagram.notification.js
// Revision : 0.1.20
// Create Date : 12 Feb 2012
// Last Update : 15 Jan 2014
// Licensed under the MIT License
// required : jQuery
//==========================================
// Copyright (c) 2014 anagram inc.
// http;//anagram.jp
//##########################################

;(function($) {

	$.extend($.fn, {
		notification: function( opt ) {
			
			opt = $.extend({
				'position':		"top",
				'effect':		"slideTop",
				'message':		"message",
				'time':			"2",
				'callback':		function(){}
			}, opt);
			
			this.opt = opt;
			
			if ( !this.anagramNotificationState ) this.anagramNotificationState = "standby";
			
			
			clearTimeout(this.anagramNotificationTimer);
			this.anagramNotificationTimer = null;
			clearTimeout(this.anagramNotificationTimer2);
			this.anagramNotificationTimer2 = null;
			
			
			if ( this.anagramNotificationState != "standby" ) {
				this.hideNotification();
				this.anagramNotificationTimer2 = setTimeout(this.create.bind(this),500);
			} else {
				this.create();
			}
			
			
			
			return this;
		},
		
		
		create: function(){
		
			if ( !$("#anagramNotificationElement").get(0) ) {
				$('<div/>', {
					id: 	'anagramNotificationElement',
					text:	this.opt.message
				}).appendTo('body');
				
				$("#anagramNotificationElement").hide();
				
				switch( this.opt.effect ) {
					case "slideTop":
						$("#anagramNotificationElement").css({
							"z-index":	"99",
							"position":	"fixed",
							"left":		"0",
							"top": 		"-50px"
						});
						break;
					case "slideBottom":
						$("#anagramNotificationElement").css({
							"z-index":	"99",
							"position":	"fixed",
							"left":		"0",
							"bottom": 	"-50px"
						});
						break;
				}
				
				$("#anagramNotificationElement").css({
					"position":	"fixed",
					"color":		"#fff",
					"font-size":	"12px",
					"font-weight":	"900",
					"background":	"rgba(0,0,0,0.5)",
					"box-shadow":	"0px 0px 5px rgba(0,0,0,0.5)",
					"white-space":	"nowrap",
					"text-overflow":"ellipsis",
					"text-shadow":	"none",
					"line-height":	"25px",
					"width":		"100%",
					"height":		"25px",
					"padding":		"0 10px",
					"-webkit-transition-property": 	"-webkit-transform",
					"-webkit-transition-duration": 	"0.5s",
					"-webkit-transition-delay": 	"0s",
					"-webkit-transition-timing-function": "ease-in-out",
					"-webkit-transform": 			"translateY(0) translateZ(0)",
					"transition-property": 			"transform",
					"transition-duration": 			"0.5s",
					"transition-delay": 			"0s",
					"transition-timing-function": 	"ease-in-out",
					"transform": 					"translateY(0px) translateZ(0)"
				});
			} else {
				$("#anagramNotificationElement").html(this.opt.message);
			}
				
			this.anagramNotificationState = "display";
			
			this.anagramNotificationTimer = setTimeout(this.appearNotification1.bind(this),1);
		},
			
		appearNotification1: function(){
			$("#anagramNotificationElement").show();
			this.anagramNotificationTimer = setTimeout(this.appearNotification2.bind(this),1);
		},
			
		appearNotification2: function(){
			switch( this.opt.effect ) {
				case "slideTop":
					$("#anagramNotificationElement").css({
						"-webkit-transform": 	"translateY(50px) translateZ(0)",
						"transform": 			"translateY(50px) translateZ(0)"
					});
					break;
				case "slideBottom":
					$("#anagramNotificationElement").css({
						"-webkit-transform": 	"translateY(-49px) translateZ(0)",
						"transform": 			"translateY(-49px) translateZ(0)"
					});
					break;
			}
			
			this.anagramNotificationTimer = setTimeout(this.hideNotification.bind(this),this.opt.time*1000);
		},
		
			
		hideNotification: function(){
			switch( this.opt.effect ) {
				case "slideTop":
					$("#anagramNotificationElement").css({
						"-webkit-transform": 			"translateY(0) translateZ(0)",
						"transform": 					"translateY(0) translateZ(0)"
					});
					break;
				case "slideBottom":
					$("#anagramNotificationElement").css({
						"-webkit-transform": 			"translateY(0) translateZ(0)",
						"transform": 					"translateY(0) translateZ(0)"
					});
					break;
			}
			this.anagramNotificationTimer = setTimeout(this.finish.bind(this),500);
		},
		
			
		finish: function(){
			$("#anagramNotificationElement").hide();
			this.anagramNotificationState = "standby";
		}
			
			
	});
	
})(jQuery);















