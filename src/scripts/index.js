/*global console: true,_:true,Backbone:true,define:true*/

define([
    'jquery', 
    'underscore', 
    'backbone', 
    'soundmanager', 
    'skitzSlider', 
    'track',
    'trackList', 
    'player',
    'text!templates/featured.html'
],
    function($, _, Backbone, soundManager, skitzSlider, Track, TrackList, Player, featureTmpl){
        'use strict';

       

        var recentTracks = [
            {

                'trackId': 'td-4-27-12',
                'trackUrl' : '',
                'title' : 'Tommy doyles live set - 4/27/2012 ',
                'artist' : 'Artist 4',
                'cover' : '/images/mixes/td.jpg',
                'downloadUrl' : '/tracks/td-4-27-12.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            },  
            {   
                'trackId': 'afterHours',
                'title' : 'After Hours',
                'artist' : 'Artist 1',
                'cover' : '/images/mixes/ah.png',
                'downloadUrl' : '/tracks/AfterHours.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            },
            {
                'trackId': 'brownNoise',
                'title' : 'Brown Noise Special',
                'artist' : 'Artist 2',
                'cover' : '/images/mixes/bn.jpg',
                'downloadUrl' : '/tracks/BrownNoise.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            }
                       

        ];

        var tracks = [
            {
                'trackId': 'michaelJackson',
                'title' : 'A Tribute to Michael Jackson',
                'artist' : 'Artist 3',
                'cover' : '/images/mixes/mj.jpg',
                'downloadUrl' : '/tracks/MichaelJackson.mp3',
                'trackMarks' : [2.5, 5.65, 30, 40, 60,80],
                'selected' : false
            },
            {
                'trackId': 'lilWayne',
                'title' : 'Lil Wayne a Mili (Skitz Mix)',
                'artist' : 'Artist 4',
                'cover' : '/images/mixes/lw.jpg',
                'downloadUrl': '/tracks/LilWayne.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            }

        ];

        var DJ = {};

        DJ.AppV = Backbone.View.extend({
            tagName: 'div',
            className: 'featured-container',
            template: _.template(featureTmpl),
            events: {

            },
            initialize: function(){
                console.log('Featured App Init');


            },
            render: function(){
                this.$el.html(this.template());
                
                return this;

            },
            renderRecent: function(){
                _.each(this.recentList.models, function(trackM){
                    var trackItem = new Track.TrackV({
                        model: trackM
                    });
                    trackItem.$el.appendTo('.track-list');

                }, this);
                console.log('render list');

            },
            renderList : function() {

                _.each(this.trackList.models, function(trackM){
                    var trackListItem = new Track.TrackV({
                        model: trackM
                    });
                    trackListItem.$el.appendTo('.music-list');

                }, this);

            },
            loadTrack : function(id){
                $('.controls').remove();
                var currTrack = this.trackList.filterList(id);
                
                var controls = new Player.PlayerV({
                    model: currTrack
                });
                $('.controls-container').append(controls.render().el);
                console.log('loadTrack');
                soundManager.onready(function(){
                    controls.loadTrack();
                });
                
            }

        });

        return DJ;
});