/*global console: true,_:true,Backbone:true,define:true*/

define(['jquery', 'underscore', 'backbone', 'track'],
	function($, _, Backbone, track){
		'use strict';
		var tracks = [
			{
				'title' : 'Track 1',
				'atrist' : 'Artist 1',
				'cover' : 'None',
				'url' : 'track1.mp3'
			},
			{
				'title' : 'Track 2',
				'atrist' : 'Artist 2',
				'cover' : 'None',
				'url' : 'track2.mp3'
			},
			{
				'title' : 'Track 3',
				'atrist' : 'Artist 3',
				'cover' : 'None',
				'url' : 'track3.mp3'
			},
			{
				'title' : 'Track 4',
				'atrist' : 'Artist 4',
				'cover' : 'None',
				'url' : 'track4.mp3'
			}			

		];

		var DJ = {};
		
		DJ.TrackListC = Backbone.Collection.extend({
			model: track.DJ.TrackM,
			initialize: function(){
			

			},
			filterList: function(){
				
				_.filter(this.models, function(tracks){
					return console.log(tracks.get('selected') === 'true');
				});


			},
			changeTrack: function(){


			}
		});

		DJ.TrackListV = Backbone.View.extend({
			tagName: 'ul',
			className: 'track-list',
			events: {

			},
			initialize: function(){
				this.tracklist = new DJ.TrackListC(tracks);
				this.render();

			},
			render: function(){
				_.each(this.tracklist.models, function(trackM){
					var trackItem = new track.DJ.TrackV({
						model: trackM
					});
					this.$el.appendTo('body');
					trackItem.$el.appendTo(this.$el);

				}, this);
				

			}

		});

		return DJ;
});