//##########################################
// [ jQuery stackable Plugin ]
// jquery.stackable.js
// Revision : 0.0.1
// Create : 21 Mar 2014
// Last Update : 21 Mar 2014
// Licensed under the MIT License
// required : jQuery 1.9.0
//==========================================
// Copyright (c) 2014 anagram inc.
// http;//anagram.jp
// Programmed by : Hideki Ushiyama
// Invented by : Atsushi Terada
//##########################################


;(function($) {

	$.extend($.fn, {
		stackable: function(p) {
			
			// Initialise Parameters
			
			p = $.extend({
				'target':			this,
			}, p);
			
			
			
			// Properties
			
			this.currentPageNum = 1;
			
			
			
			// Methods
						
			function getCurrentPageNum() {
				
				var pageNum;
				
				return this.currentPageNum;
				
			};
						
			function getTotalPageNum() {
				
				var pageNum;
				
				return pageNum;
				
			};
						
			function nextPage() {
				
				var pageNum;
				
				return pageNum;
				
			};
						
			function prevPage() {
				
				var pageNum;
				
				return pageNum;
				
			};
						
			function changePage( pageNum ) {
				
				var result = false;
				
				return result;
				
			};
			
			return this;
			
		}
	});
	
})(jQuery);















