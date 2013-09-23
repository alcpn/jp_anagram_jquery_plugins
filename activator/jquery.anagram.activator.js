//##########################################
// [ jQuery activator Plugin ]
// jquery.anagram.activator.js
// Revision : 0.1.00
// Create Date : 13 Sep 2013
// Last Update : 13 Sep 2013
// Licensed under the MIT License
// required : jQuery
//==========================================
// Copyright (c) 2013 anagram inc.
// http;//anagram.jp
//##########################################

/*

Usage. =====================================

<script src="jquery.anagram.activator.js"></script>
<script>$(function() { $('a').activator(); });</script>


Usage. =====================================
Change class name and turn off unlink option

<script src="jquery.anagram.activator.js"></script>
<script>
$(function() {
	$('#contents a').activator({
		className:		'currentPage',
		unlink:			false
	});
});
</script>

*/


;(function($) {

	$.extend($.fn, {
		activator: function(p) {
			
			p = $.extend({
				target:		$(this),
				className:	"active",
				unlink:		true // true (remove href) or false (keep href)
			}, p);
			
			var path = location.href.split('/');  
			var endPath = '/'+path.slice(path.length-2,path.length).join('/'); 
			$(p.target).each(function(){
				if ( $(this).attr('href') == endPath ) {
					console.log("[activator] "+$(this).attr('href'));
					$(this).addClass(p.className);
					if ( p.unlink ) $(this).removeAttr('href');
				}
			});
			
			return this;
			
		}
	});
	
})(jQuery);















