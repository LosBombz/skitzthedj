/*global console: true,_:true,Backbone:true,define:true*/

define([
    'jquery', 
    'underscore', 
    'backbone', 
    'soundmanager',
    'modules/player/controls'
    ],
    function($, _, Backbone, soundManager, controls){
        'use strict';


        var DJ = {};
        

        DJ.PlayerM = Backbone.Model.extend({
            defaults: {
                trackId: '',
                url: '',
                durration: '',
                trackMarks: [],
                title: '..: DJ. Skitz /--_[o - o]_--\\ DJ. Skitz :..',
                artist: ''
            }

        });

        DJ.PlayerV = Backbone.View.extend({
            el: '.controls-container',
            events: {

            },
            initialize: function(){
                console.log(this.model);
    
                this.render();

                

            },
            render: function(){

                var controlsV = new controls.ControlsV({
                    model: this.model
                });

                this.$el.append(controlsV.render().el);

                return this;

            },
            loadTrack : function(track){
                var currTrack = track;

                console.log(currTrack.get('trackId'));

                 // // var currTrack = this.currTrack;
            // // if(currTrack) {
            // //   soundManager.destroySound('currTrack');
            // // }

            // // var selfView = this;          

            // soundManager.createSound({
            //  id: 'currTrack',
            //  url: this.model.get('url'),
            //  whileloading: function() {
            //      $('#loadingBar').text('LOADING');

            //  },
            //  onload: function(){
            //      $('#loadingBar').text('');
            //      selfView.setMarks();
            //  },
            //  whileplaying : function(){
            //      currTrack = soundManager.sounds.currTrack;
            //      var pos = ( currTrack.position / currTrack.duration ) * 100;
            //      $('#progressBar').css({
            //          width: pos + '%'
            //      });
            //      console.log(this.waveformData.left);
            //      var scale = 32;
            //      for(var i = 0; i < 256; i++){
            //          console.log(scale+Math.ceil(this.waveformData.left[i]*-scale));

            //      }
                    
            //  },
            //  onfinish : function(){

            //      currTrack.setPosition( 0 );
            //      $('#progressBar').css({
            //          width: 0
            //      });
            //      $('#playBtn').text('!');
            //  }
                
            // });
                
                
            }


        });

        return DJ;
});