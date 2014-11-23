//##########################################
// [ jQuery loader Plugin ]
// jquery.anagram.loader.js
// Revision : 0.1.01
// Create Date : 22 Nov 2014
// Last Update : 23 Nov 2014
// Licensed under the MIT License
// required : jQuery
//==========================================
// Copyright (c) 2014 anagram inc.
// http;//anagram.jp
//##########################################

/*

	// Examples

var Sources = $.loader([
	'https://github.com/alcpn/jp_anagram_jquery_plugins/raw/master/resizer/jquery.anagram.resizer.js',
	'https://github.com/alcpn/jp_anagram_jquery_plugins/raw/master/tapeslide/jquery.anagram.tapeslide.js'
]);



*/


;(function($) {
	
	$.extend($.fn, {
		loader: function( p ) {
				
			this.sources = [];
			
			this.list = function(){
				return this.sources;
			}
			
			this.add = function( p ){
				var sources = [];
				sources = sources.concat(p);
				$.each( sources,function(){
					document.write('<script src="'+this+'"></script>');
				});
				this.sources = this.sources.concat( sources );
				return this.sources;
			}
			
			this.add( p );
			
			return this;
			
		}
	});
	
})(jQuery);















