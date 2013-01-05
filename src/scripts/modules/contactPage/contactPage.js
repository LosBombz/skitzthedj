/*global console: true,_:true,Backbone:true,define:true, window:true*/

define(['jquery', 'underscore', 'backbone','text!templates/contact.html'],

function($, _, Backbone, contactTmpl){
'use strict';

	var DJ = {};

	DJ.ContactM = Backbone.Model.extend({
		defaults : {
			'content': 'I have no Contact'
		},
		initialize : function(){

		}
	});

	DJ.ContactV = Backbone.View.extend({
		tagName: 'div',
		className: 'footer-wrap',
		model: new DJ.ContactM(),
		template: _.template(contactTmpl),
		events: {
			'click .contact-btn' : 'openToggle'
		},
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
            this.$el.height($(window).height() - 61).css({top: $('.footer-wrap').height() + 30});
            this.$el.animate({top: 61});


            $(window).on('resize', function(){
                 $('.footer-wrap').height($(window).height() - 61);
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
	
	DJ.contact = new DJ.ContactV();


	return DJ;

});