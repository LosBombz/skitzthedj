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
     * @class
     * @param {[type]} opts [description]
     */
    function Player(opts){
        this.model = opts.model;

        this.model.on('change:trackUrl', this.loadTrack, this);
        this.model.on('change:playing', this.togglePlay, this);
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
        // var url = track.get('trackUrl');
        var currentTrack;
        // var self = this;

        if (this.model.get('currentTrack')) {
            this.model.get('currentTrack').stop();
        }

        // soundManager.createSound({
        //         id: trackId,
        //         url: url,
        //         whileloading: function(){
        //             var loaded = Math.round(this.bytesLoaded / this.bytesTotal * 100) + '%';
                    
        //             self.model.set({
        //                 loaded: loaded
        //             });

        //             //console.log(this.buffered);
        //         },
        //         whileplaying : function(){
        //             var currentTrack = this;


        //             var pos = ( currentTrack.position / currentTrack.duration ) * 100;
                    
        //             self.model.set({
        //                 time: toMinutes(this.position) + ' / ' + toMinutes(this.duration),
        //                 progress: pos + '%'
        //             });

    


        //            //visualizer(waveData.left, waveData.right);

        
        //         },
        //         onload : function(){
        //             //console.log('LOADED');
        //         }

        //     });

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