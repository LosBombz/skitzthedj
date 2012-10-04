/*global console: true,_:true,Backbone:true,define:true*/


define(['jquery', 'underscore', 'backbone','soundmanager'],

function($, _, Backbone, soundManager){
'use strict';
	var DJ = {};

	DJ.PlayerV = Backbone.View.extend({
		tagName: 'div',
		className: 'controls',
		template: _.template($('#controlsTmpl').html()),
		events: {
			'click .controls #playBtn' : 'playTrack',
			'mousedown .tracking-container' : 'seek'
		},
		initialize: function(){
			this.render();

		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON())).appendTo('.controls-container');
			
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
			var currTrack = soundManager.sounds.currTrack;
			if(currTrack) {
				soundManager.destroySound('currTrack');
			}

			this.setMarks();

			soundManager.createSound({
				id: 'currTrack',
				url: this.model.get('url'),
				autoLoad: true,
				//autoPlay: true,
				onplay: function(){
					//console.log(currMix.duration);
					$('#playBtn').text('"');
				},
				onstop: function(){
					console.log(currTrack.duration);
					$('#playBtn').text('!');
				},
				onpause: function(){
				   $('#playBtn').text('!');
				},
				onresume : function(){
					$('#playBtn').text('"');
				},
				whileloading: function() {
					//$('.tracking-container').text('LOADING');

				},
				onload: function(){
					//$('.tracking-container').text(' ');
				},
				whileplaying : function(){
					currTrack = soundManager.sounds.currTrack;
					var pos = (currTrack.position / currTrack.duration) * 100;
					$('#progressBar').css({
						width: pos + '%'
					});
				}
				
			});
		},
		playTrack: function(){
			var currTrack = soundManager.sounds.currTrack;

			currTrack.togglePause();
		},
		seek: function(e){
			console.log(e);
			var currTrack = soundManager.sounds.currTrack;
			var pos = e.offsetX / $('.tracking-container').width() * 100;
			var setPos = pos * currTrack.duration / 100;
			console.log(pos * currTrack.duration / 100);

			currTrack.setPosition(setPos);
			$('#progressBar').css({
				width: pos + '%'
			});
			console.log('down');
			$('.tracking-container').on('mousemove', function(e){
				
				pos = e.offsetX / $('.tracking-container').width() *100;
				console.log(pos);
				$('#progressBar').css({
						width: pos + '%'
				});
				
			});
			$(window).on('mouseup', function(){
				
				$('.tracking-container').off('mousemove');
			});
				
			
		}

	});
	return {
		DJ: DJ
	};

});