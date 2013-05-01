/*global console: true,_:true,Backbone:true,define:true*/

define([
	'jquery', 
	'underscore', 
	'backbone',
	'text!modules/tracks/templates/track.html'
],

function($, _, Backbone, trackTmpl){
'use strict';

	var DJ = {};

	DJ.TrackM = Backbone.Model.extend({
		defaults : {
			'trackId' : '',
			'trackUrl' : '',
			'title' : 'Track',
			'artist' : 'unknown',
			'cover' : '/images/mixes/no-cover.jpg',
			'downloadUrl' : '',
			'trackMarks' : [],
			'type' : 'Live Set',
			'selected' : false
		},
		initialize : function(){

		}
	});

	DJ.TrackV = Backbone.View.extend({
		tagName: 'li',
		className: 'track',
		template: _.template(trackTmpl),
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