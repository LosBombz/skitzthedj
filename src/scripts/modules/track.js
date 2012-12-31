/*global console: true,_:true,Backbone:true,define:true*/

define([
	'jquery', 
	'underscore', 
	'backbone'
],

function($, _, Backbone){
'use strict';

	var DJ = {};

	DJ.TrackM = Backbone.Model.extend({
		defaults : {
			'trackId' : '',
			'title' : 'Track',
			'atrist' : 'unknown',
			'cover' : '/images/mixes/no-cover.jpg',
			'url' : '',
			'trackMarks' : [],
			'selected' : false
		},
		initialize : function(){

		}
	});

	DJ.TrackV = Backbone.View.extend({
		tagName: 'li',
		className: 'track',
		template: _.template($('#fTrackTmpl').html()),
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

	DJ.MTrackV = Backbone.View.extend({
		tagName: 'li',
		className: 'track',
		template: _.template($('#mTrackTmpl').html()),
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

	return DJ;

});