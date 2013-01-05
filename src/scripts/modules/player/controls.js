/*global console: true,_:true,Backbone:true,define:true*/


define([
	'jquery', 
	'underscore', 
	'backbone',
	'soundmanager',
	'text!templates/controls.html'
],

function( $, _, Backbone, soundManager, controlsTmpl){
'use strict';
	var DJ = {};

	DJ.ControlsM = Backbone.Model.extend({
		defaults: {
			url: '',
			durration: '',
			trackMarks: [],
			title: '..: DJ. Skitz --_[o - o]_-- DJ. Skitz :..'
		}
	});

	DJ.ControlsV = Backbone.View.extend({
		tagName: 'div',
		className: 'controls',
		template: _.template(controlsTmpl),
		events: {
			'click #playBtn' : 'playTrack',
			'mousedown .tracking-container' : 'seek'
		},
		initialize: function(){
			//this.currTrack = soundManager.sounds.currTrack;

		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		},
		setMarks : function(){
			
			var marks = this.model.get('trackMarks');

			$(marks).each(function(i,v){

				$('<div />', {
					'css' : {
						'width' : 0,
						'-webkit-box-shadow':'1px 0 1px 1px rgba(255,255,255,.9)',
						'height' : '60px',
						'position' : 'absolute',
						'top' : 0,
						'background' : '#fff'
					},
					'class' : 'mark'
				}).appendTo('.marks-container').animate({left : v + '%'});
			});

		},
		loadTrack : function(){
			// var currTrack = this.currTrack;
			// if(currTrack) {
			// 	soundManager.destroySound('currTrack');
			// }

			// var selfView = this;			

			soundManager.createSound({
				id: 'currTrack',
				url: this.model.get('url'),
				whileloading: function() {
					$('#loadingBar').text('LOADING');

				},
				onload: function(){
					$('#loadingBar').text('');
					selfView.setMarks();
				},
				whileplaying : function(){
					currTrack = soundManager.sounds.currTrack;
					var pos = ( currTrack.position / currTrack.duration ) * 100;
					$('#progressBar').css({
						width: pos + '%'
					});
					console.log(this.waveformData.left);
					var scale = 32;
					for(var i = 0; i < 256; i++){
						console.log(scale+Math.ceil(this.waveformData.left[i]*-scale));

					}
					
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
			var currTrack = this.currTrack;
			console.log('toggle play');
			currTrack.togglePause();
		},
		seek: function( e ){
			console.log( e );
			var currTrack = this.currTrack;
			var pos = e.offsetX / $('.tracking-container').width() * 100;
			var setPos = pos * currTrack.duration / 100;
			console.log(pos * currTrack.duration / 100);

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