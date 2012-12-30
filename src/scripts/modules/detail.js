/*global console: true,_:true,Backbone:true,define:true, window:true*/

define(['jquery', 'underscore', 'backbone'],

function($, _, Backbone){
'use strict';

	var DJ = {};


	DJ.DetailV = Backbone.View.extend({
		tagName: 'div',
		className: 'header-wrap',
		template: _.template($('#detailTmpl').html()),
		initialize: function(){
			this.isOpen = false;
			this.render();
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON())).appendTo('.footer-hook');
			return this;
		},
		openToggle : function(){

			if(this.isOpen){
                this.close();
            } else {
                this.open();
            }

		},
		open : function(){
			this.isOpen = true;

            this.$el.css({ bottom: ''});
            this.$el.height($(window).height() - 63).css({top: $('.footer-wrap').height() + 30});
            this.$el.animate({top: 63});


            $(window).on('resize', function(){
                 $('.footer-wrap').height($(window).height() - 63);
            });

		},
		close : function(){
			this.isOpen = false;

            $(window).off('resize');

            this.$el.animate({top: $(window).height() + -30}, function(){
                $('.footer-wrap').height(30);
                  $('.footer-wrap').css({top: '', bottom: 0});
            });
		}
	
	});
	
	


	return DJ;

});