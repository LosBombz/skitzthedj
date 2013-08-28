/*global define*/


define([
    'jquery',
    'underscore',
    'backbone',
    'soundmanager',
    'text!modules/player/templates/controls.html',
    'd3'
],

function( $, _, Backbone, soundManager){
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


    function Player(opts){
        this.model = opts.model;

        this.model.on('change:trackUrl', this.loadTrack, this);
        this.model.on('change:playing', this.playToggle, this);
        this.model.on('change:position', this.seek, this);

        return this;
    }

    Player.prototype.togglePlay = function() {

        var currentTrack = this.model.get('currentTrack');

        if(!currentTrack){
            return false;
        }

        currentTrack.togglePause();

    };

    /**
     * create a sound object
     * 
     * @param  {object} track   track model
     */
    Player.prototype.loadTrack = function(track) {
        var trackId = track.get('trackId');
        var url = track.get('trackUrl');
        var currentTrack;
        var self = this;

        if (this.model.get('currentTrack')) {
            this.model.get('currentTrack').destruct();
        }

        soundManager.createSound({
                id: trackId,
                url: url,
                whileloading: function(){
                    var loaded = Math.round(this.bytesLoaded / this.bytesTotal * 100) + '%';
                    
                    self.model.set({
                        loaded: loaded
                    });

                    //console.log(this.buffered);
                },
                whileplaying : function(){
                    var currentTrack = this;


                    var pos = ( currentTrack.position / currentTrack.duration ) * 100;
                    
                    self.model.set({
                        time: toMinutes(this.position) + ' / ' + toMinutes(this.duration),
                        progress: pos + '%'
                    });

    


                   //visualizer(waveData.left, waveData.right);

        
                },
                onload : function(){
                    //console.log('LOADED');
                }

            });

            currentTrack = soundManager.getSoundById(trackId);

            this.model.set({currentTrack: currentTrack}, {silent:true});

    };
    
    /**
     * seek a track
     * 
     */
    Player.prototype.seek = function() {
        var currentTrack = this.model.get('currentTrack');
        var setPos = this.model.get('position');

        currentTrack.setPosition(setPos);

    };

    
    return Player;

});