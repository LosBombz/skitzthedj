/*global console: true,_:true,Backbone:true,define:true*/

define(['jquery', 'underscore', 'backbone'],

function($, _, Backbone){
'use strict';

	var DJ = {};

	DJ.TrackM = Backbone.Model.extend({
		defaults : {
			'trackId' : '',
			'title' : 'Track',
			'atrist' : 'unknown',
			'cover' : '',
			'url' : '',
			'trackMarks' : []
		},
		initialize : function(){

		}
	});

	DJ.TrackV = Backbone.View.extend({
		tagName: 'li',
		className: 'track',
		template: _.template($('#trackTmpl').html()),
		events: {
			'click' : 'select'
		},
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		select: function(e){
			$('.track').removeClass('selected');
			this.$el.addClass('selected');
		}
	});

	return {
		DJ: DJ
	};

});