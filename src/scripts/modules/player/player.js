/*global console: true,_:true,Backbone:true,define:true*/


define([
	'jquery', 
	'underscore', 
	'backbone',
	'soundmanager',
	'text!modules/player/templates/controls.html'
],

function( $, _, Backbone, soundManager, controlsTmpl ){
'use strict';
	var DJ = {};

	DJ.PlayerV = Backbone.View.extend({
		tagName: 'div',
		className: 'controls',
		template: _.template(controlsTmpl),
		events: {
			'click #playBtn' : 'playTrack',
			'mousedown .tracking-container' : 'seek'
		},
		initialize: function(){
			this.render();

		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON())).appendTo('.controls-container');
			this.$el.fadeIn();

			return this;
		},
		loadTrack : function(){
			var currTrack = soundManager.sounds.currTrack;
			if(currTrack) {
				soundManager.destroySound('currTrack');
			}		

			soundManager.createSound({
				id: 'currTrack',
				url: this.model.get('url'),
				whileloading: function() {
					$('#loadingBar').text('LOADING');

				},
				onload: function(){
					$('#loadingBar').text('');
				},
				whileplaying : function(){
					currTrack = soundManager.sounds.currTrack;
					var pos = ( currTrack.position / currTrack.duration ) * 100;
					$('#progressBar').css({
						width: pos + '%'
					});
					
				},
				onfinish : function(){

					currTrack.setPosition( 0 );
					$('#progressBar').css({
						width: 0
					});
					$('#playBtn').text('!');
				}
				
			});
		},
		playTrack: function(){
			var currTrack = soundManager.sounds.currTrack;
			console.log('toggle play');
			currTrack.togglePause();
		},
		seek: function( e ){
			console.log( e );

			//fix for firefox
			if (e.offsetX === undefined) {
				e.offsetX = e.pageX-$('.tracking-container').offset().left;
			}

			var currTrack = soundManager.sounds.currTrack;

			var pos = e.offsetX / $('.tracking-container').width() * 100;
			var setPos = parseInt(pos * currTrack.duration / 100, 10);
			console.log(e);

			currTrack.setPosition(setPos);
			$('#progressBar').css({
				width: pos + '%'
			});
			console.log('down');
				
			
		},
		toggleDetail : function(){

		}

	});
	return DJ;

});