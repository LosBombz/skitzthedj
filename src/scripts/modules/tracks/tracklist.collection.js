/*global define*/

define(['jquery', 'underscore', 'backbone', 'track.model', 'soundmanager'],
    function($, _, Backbone, TrackModel, soundManager){
        'use strict';

        /**
         * returns a 0 padded string number
         * @param  {number} number      the number to pad
         * @param  {number} width       number of 0's to pad with
         * @return {string}             string representation of the new number
         */
        function pad( number, width ) {
            width -= number.toString().length;
            if ( width > 0 ) {
                return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
            }
            return number + ''; // always return a string
        }

        /**
         * take a number in miliseconds and convert it to minutes
         * 
         * @param  {number} milliseconds    time in miliseconds
         * @return {string}                 time in minutes
         */
        function toMinutes (milliseconds) {
            var seconds = milliseconds / 1000;

            var numSeconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
            var numMinutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);


            return pad(numMinutes, 2) + ':' + pad(numSeconds, 2);
        }

        return Backbone.Collection.extend({
            model: TrackModel,
            initialize: function(){
              
            },
            select : function(id){
               return this.findWhere({trackId : id});
            },
            createSound: function() {
                console.log(this);
                this.map(function(model){
                    soundManager.createSound({
                        id: model.get('trackId'),
                        url: model.get('trackUrl'),
                        whileloading: function(){
                            var loaded = Math.round(this.bytesLoaded / this.bytesTotal * 100) + '%';
                            
                            model.set({
                                loaded: loaded
                            });

                            //console.log(this.buffered);
                        },
                        whileplaying : function(){
                            var currentTrack = this;


                            var pos = ( currentTrack.position / currentTrack.duration ) * 100;
                            
                            model.set({
                                time: toMinutes(this.position) + ' / ' + toMinutes(this.duration),
                                progress: pos + '%'
                            });

            


                           //visualizer(waveData.left, waveData.right);

                
                        },
                        onload : function(){
                            //console.log('LOADED');
                        }

                    });
                });
            }
        });



});