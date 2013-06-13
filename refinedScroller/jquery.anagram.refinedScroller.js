//##########################################
// [ jQuery refinedScroller Plugin ]
// jquery.anagram.refinedScroller.js
// Revision : 0.1.10
// Create : 13 Jan 2012
// Last Update : 15 Jan 2012
// Licensed under the MIT License
// require : jQuery
//==========================================
// Copyright (c) 2012 ANAGRAM Inc.
// http;//anagram.jp
//##########################################


;(function($) {

	$.extend($.fn, {
		refinedScroller: function(p) {
			
			p = $.extend({
				'target':	$($(this).get(0)),
				'parent':	$($(this).parent().get(0)),
				'hitArea':	50,
				'speed': 	5
			}, p);
			
			p.x = 0;
			p.y = 0;
			p.status = "standby";
			
			p.parent.css({
				'position':		'relative',
				'overflow':		'hidden'
			});
			
			if ( navigator.userAgent.indexOf("iPhone") > -1 || navigator.userAgent.indexOf("Android") > -1 ) {
				p.parent.css({
					'position':		'relative',
					'overflow':		'scroll'
				});
			}
			
			p.target.css({
				'position':		'absolute',
				'left':			'0px',
				'top':			'0px'
			});
			
			p.parent.mousemove(function(e){
			});
			
			p.parent.bind("mousedown",onTouchStart);
			p.parent.bind("mousemove",onTouchMove);
			p.parent.bind("mouseup",onTouchEnd);
			p.parent.bind("touchstart",onTouchStart);
			p.parent.bind("touchmove",onTouchMove);
			p.parent.bind("touchend",onTouchEnd);
			
			setInterval(updater,20);
			
			function onTouchStart(e) {
			
				if ( e.touches ) {
					var touchX = e.touches[0].clientX;
					var touchY = e.touches[0].clientY;
				} else {
					var touchX = e.clientX;
					var touchY = e.clientY;
				}
				
				p.holdFlag = true;
				p.holdStartX = p.x;
				p.holdStartClientX = touchX;
				p.holdStartY = p.y;
				p.holdStartClientY = touchY;
			}
			
			function onTouchMove(e) {
				if ( p.holdFlag ) {
					if ( e.touches ) {
						var touchX = e.touches[0].clientX;
						var touchY = e.touches[0].clientY;
					} else {
						var touchX = e.clientX;
						var touchY = e.clientY;
					}
					
					if ( p.target.width() > p.parent.width() ) {
						p.x = ( touchX - p.holdStartClientX ) + p.holdStartX;
						if ( p.x > 0 ) p.x = 0;
						if ( p.x < ( p.parent.width() - p.target.width() ) ) p.x = p.parent.width() - p.target.width();
					}
					if ( p.target.height() > p.parent.height() ) {
						p.y = ( touchY - p.holdStartClientY ) + p.holdStartY;
						if ( p.y > 0 ) p.y = 0;
						if ( p.y < ( p.parent.height() - p.target.height() ) ) p.y = p.parent.height() - p.target.height();
					}
					setPosition( p.target, p.x, p.y );
				} else {
					//console.info( e.target + " / " + p.parent );
					//console.info( e.clientX + " / " +( p.parent.width() - p.hitArea ) );
					//console.info( e.clientY + " / " +( p.parent.height() - p.hitArea ) );
					p.status = "standby";
					if ( e.clientX < p.hitArea ) {
						if ( p.target.width() > p.parent.width() ) p.status = "moveLeft";
					} else if ( e.clientX > p.parent.width() - p.hitArea ) {
						if ( p.target.width() > p.parent.width() ) p.status = "moveRight";
					} else if ( e.clientY < p.hitArea ) {
						if ( p.target.height() > p.parent.height() ) p.status = "moveDown";
					} else if ( e.clientY > p.parent.height() - p.hitArea ) {
						if ( p.target.height() > p.parent.height() ) p.status = "moveUp";
					}
				}
			}
			
			function onTouchEnd(e) {
				p.holdFlag = false;
			}
			
			function updater() {
				
				switch ( p.status ) {
					case "moveLeft":
						p.x += p.speed;
						if ( p.x > 0 ) p.x = 0;
						setPosition( p.target, p.x, p.y );
						break;
					case "moveRight":
						p.x -= p.speed;
						if ( p.x < ( p.parent.width() - p.target.width() ) ) p.x = p.parent.width() - p.target.width();
						setPosition( p.target, p.x, p.y );
						break;
					case "moveDown":
						p.y += p.speed;
						if ( p.y > 0 ) p.yx = 0;
						setPosition( p.target, p.x, p.y );
						break;
					case "moveUp":
						p.y -= p.speed;
						if ( p.y < ( p.parent.height() - p.target.height() ) ) p.y = p.parent.height() - p.target.height();
						setPosition( p.target, p.x, p.y );
						break;
				}
				
			}
			
			function setPosition( target, x, y ) {
				target.css({
					'position':		'absolute',
					'left':			Math.floor(x) + 'px',
					'top':			Math.floor(y) + 'px'
				});
			}
			
			return this;
		}
	});
	
})(jQuery);















