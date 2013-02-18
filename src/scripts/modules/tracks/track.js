/*global console: true,_:true,Backbone:true,define:true*/

define([
	'jquery', 
	'underscore', 
	'backbone',
	'text!modules/tracks/templates/featuredTrack.html',
	'text!modules/tracks/templates/musicTrack.html'
],

function($, _, Backbone, featuredTmpl, musicTmpl){
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
		template: _.template(featuredTmpl),
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
		template: _.template(musicTmpl),
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