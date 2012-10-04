/*global console: true,_:true,Backbone:true,define:true*/

define(['jquery', 'underscore', 'backbone', 'soundmanager', 'modules/track', 'modules/trackList', 'modules/player', 'modules/contact', 'router'],
	function($, _, Backbone, soundManager, Track, TrackList, Player, Contact, Router){
		'use strict';

		soundManager.setup({
				url: 'motion/flash/soundmanager2_flash9_debug.swf',
				flashVersion: 9,
				useFlashBlock: false,
				ontimeout: function(error) {
		        // uh-oh, SM2 failed to start - error, unsupported or other issue
		            console.log('we messed up');
		        }
	    });

	    soundManager.beginDelayedInit();

		var tracks = [
			{	
				'trackId': 'afterHours',
				'title' : 'After Hours',
				'artist' : 'Artist 1',
				'cover' : '/images/mixes/ah.png',
				'url' : '/tracks/AfterHours.mp3',
				'trackMarks' : [10, 20, 30, 40, 60,80]
			},
			{
				'trackId': 'brownNoise',
				'title' : 'Brown Noise Special',
				'artist' : 'Artist 2',
				'cover' : '/images/mixes/bn.jpg',
				'url' : '/tracks/BrownNoise.mp3',
				'trackMarks' : [10, 20, 30, 40, 60,80]
			},
			{
				'trackId': 'michaelJackson',
				'title' : 'A Tribute to Michael Jackson',
				'artist' : 'Artist 3',
				'cover' : '/images/mixes/mj.jpg',
				'url' : '/tracks/MichaelJackson.mp3',
				'trackMarks' : [10, 20, 30, 40, 60,80]
			},
			{
				'trackId': 'lilWayne',
				'title' : 'Lil Wayne a Mili (Skitz Mix)',
				'artist' : 'Artist 4',
				'cover' : '/images/mixes/lw.jpg',
				'url' : '/tracks/LilWayne.mp3',
				'trackMarks' : [10, 20, 30, 40, 60,80]
			}			

		];

		var contact = {
			'content' : 'wait, I DO have contact'
		};

		var DJ = {};
		
		DJ.AppC = Backbone.Collection.extend({
			model: Track.DJ.TrackM,
			initialize: function(){
				// this.filterList();
			},
			filterList: function(id){
				var track = this.filter(function(model){ return model.get('trackId') === id; });
				return track[0];
			}
		});

		DJ.AppV = Backbone.View.extend({
			tagName: 'div',
			className: 'container',
			events: {

			},
			initialize: function(){
				this.on('change:trackChange', this.loadTrack);
				console.log('App Init');
				this.trackList = new DJ.AppC(tracks);
				this.render();


			},
			render: function(){
				this.$el.appendTo('body');
				this.renderList();


			},
			renderList: function(){
				_.each(this.trackList.models, function(trackM){
					var trackItem = new Track.DJ.TrackV({
						model: trackM
					});
				

				}, this);

			},
			loadTrack : function(id){
				$('.controls').remove();
				var currTrack = this.trackList.filterList(id);
				var controls = new Player.DJ.PlayerV({model: new Track.DJ.TrackM(currTrack.toJSON())});
				soundManager.onready(function(){
					controls.loadTrack();

				});
				
			}


		});

		DJ.app = new DJ.AppV();

		return {
			DJ: DJ
		};
});