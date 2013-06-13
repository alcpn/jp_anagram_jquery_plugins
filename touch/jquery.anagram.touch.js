//##########################################
// [ jQuery touch Plugin ]
// jquery.anagram.touch.js
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
		touch: function(fnTouchStart,fnTouchEnd,p) {
			
			p = $.extend({
			}, p);
			
			p.target = $(this);
			
			$(this).bind( "touchstart" , fnTouchStart , false);
			if ( fnTouchEnd ) $(this).bind( "touchend" , fnTouchEnd , false);
			
			return this;
		}
	});
	
})(jQuery);















