//##########################################
// [ jQuery datalist Plugin ]
// jquery.datalist.js
// Revision : 0.1.00
// Last Update : 9 Dec 2011
// Licensed under the MIT License
// required : jQuery , jquery.treeview.js
//==========================================
// Copyright (c) 2012 anagram inc.
// http;//anagram.jp
//##########################################


;(function($) {

	$.extend($.fn, {
		datalist: function(p) {
			
			p = $.extend({
				targetElementId:	this.attr("id"),
				data: 				{ list : [] },
				checkbox: 			false,
				onChangeCallback:	function( data ){ return data; },
				onClickCallback:	function( id ){ return id; },
			}, p);
			p.tree = $('<ul class="treelist treeview-white"></ul>');
	
			
			$.each( p.data.list , addItems );
			
			
			$("#"+p.targetElementId).html( p.tree );
			
			$("#"+p.targetElementId+" .treelist").treeview({
				//collapsed: true,
				animated: "medium",
				//control:"#sidetreecontrol",
				persist: "location"
			});
			
			$("#"+p.targetElementId+" .treelistcheckbox").change(function(){
				
				var id = $(this).attr("id");
				var value = ($(this).attr("checked"))?true:false;
				
				$.each(p.data.list,function( i , val ){
					if ( "checkbox_"+this.id == id ) {
						p.data.list[i].value = value;
					}
				});
				
				p.onChangeCallback( getData() );
				
			});
			
			$("#"+p.targetElementId+" .treelistitem").click(function( event ){
				
				var id = this.id;
				
				if ( p.type == "radio" ) {
					
					$("#"+p.targetElementId+" .treelistitem").each(function(){
						
						if ( this.id == id ) {
							$(this).addClass("selected");
						} else {
							$(this).removeClass("selected");
						}
					});
					
					p.onChangeCallback( this.id.split("_")[1] );
				
				}
				
				p.onClickCallback( this.id.split("_")[1] );
				
				
				var evt = event || window.event;
				if(evt.stopPropagation){
				  evt.stopPropagation();
				}else{
				  window.event.cancelBubble = false;
				}
				
				
			});
			
			function addItems() {
				
				if ( this.parent ) {
					if ( !$('#list_'+this.parent , p.tree).html() ) {
						$('<ul id="list_'+this.parent+'"></ul>').appendTo($('#listitem_'+this.parent , p.tree));
					}
					var target = $('#list_'+this.parent , p.tree);
				} else {
					var target = p.tree;
				}
				if ( p.type == "checkbox" ) {
					$('<li id="listitem_'+this.id+'" class="treelistitem"><span class="label"><input type="checkbox" class="treelistcheckbox" id="checkbox_'+this.id+'" '+((this.value)?"checked":"")+' />' + this.label + "</span></li>").appendTo( target );
				} else if (p.type == "radio" ) {
					$('<li id="listitem_'+this.id+'" style="cursor:pointer" class="treelistitem '+((this.value)?"selected":"")+'"><span class="label">' + this.label + "</span></li>").appendTo( target );
				} else {
					$('<li id="listitem_'+this.id+'" class="treelistitem"><span class="label">' + this.label + "</span></li>").appendTo( target );
				}
			};
			
			function getData() {
				
				return p.data;
				
			};
			
			return this;
		}
	});
	
})(jQuery);















