/*global console: true,_:true,Backbone:true,define:true*/

define(['jquery', 'underscore', 'backbone'],

function($, _, Backbone){
'use strict';

	var DJ = {};

	DJ.NavM = Backbone.Model.extend({
		defaults : {

		},
		initialize : function(){

		}
	});

	DJ.NavV = Backbone.View.extend({
		tagName: 'ul',
		className: 'nav-list',
		template: _.template($('#navTmpl').html()),
		events: {
			'click a' : 'active'
		},
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template()).appendTo('.nav-hook');
			return this;
		},
		active: function(e){
			this.$el.find('a').removeClass('current');
			$(e.currentTarget).addClass('current');
		}
	});

	return {
		DJ: DJ
	};

});