/*global console: true,_:true,Backbone:true,define:true*/

define([
    'jquery', 
    'underscore', 
    'backbone', 
    'soundmanager', 
    'modules/track', 
    'modules/player', 
    'modules/contact', 
    'router'
],
    function($, _, Backbone, soundManager, Track, Player, Contact, Router){
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
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : 'false'
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
                'trackMarks' : [2.5, 5.65, 30, 40, 60,80]
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

        var DJ = {};
        
        DJ.MusicAppC = Backbone.Collection.extend({
            model: Track.DJ.TrackM,
            initialize: function(){

            },
            filterList: function(id){
                var track = this.filter(function(model){ return model.get('trackId') === id; });
                return track[0];
            }
        });

        DJ.MusicAppV = Backbone.View.extend({
            tagName: 'div',
            className: 'music-container',
            template: _.template($('#musicTmpl').html()),
            events: {

            },
            initialize: function(){
                console.log('App Init');
                this.trackList = new DJ.MusicAppC(tracks);



            },
            render: function(){
                this.$el.html(this.template()).appendTo('.page-hook');
                
                this.renderList();


            },
            renderList: function(){
                _.each(this.trackList.models, function(trackM){
                    var trackItem = new Track.DJ.TrackV({
                        model: trackM
                    });
                    trackItem.$el.appendTo('.music-list');

                }, this);

            },
            loadTrack : function(id){
                $('.controls').remove();
                var currTrack = this.trackList.filterList(id);
                
                var controls = new Player.DJ.PlayerV({
                    model: new Track.DJ.TrackM(currTrack.toJSON())
                });
                
                soundManager.onready(function(){
                    controls.loadTrack();
                });
                
            },
            changePage: function(){
                console.log('Change to Music');
                var selfView = this;
                if(!$('.music-container').length){
                    $('.page-hook').fadeOut('fast', function(){
                        $('.page-hook').empty();
                        selfView.render();
                         $('.page-hook').fadeIn('fast');

                    });
                }
            }


        });

        DJ.musicApp = new DJ.MusicAppV();

        return {
            DJ: DJ
        };
});