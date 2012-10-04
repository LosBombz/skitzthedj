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
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template()).appendTo('.nav-hook');
			return this;
		}
	});

	return {
		DJ: DJ
	};

});