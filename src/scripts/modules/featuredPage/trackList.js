/*global console: true,_:true,Backbone:true,define:true*/

define(['jquery', 'underscore', 'backbone', 'modules/featuredPage/track'],
    function($, _, Backbone, track){
        'use strict';
        var tracks = [
            {
                'trackId': 'td-4-27-12',
                'title' : 'Tommy doyles live set - 4/27/2012 ',
                'artist' : 'Artist 4',
                'cover' : '',
                'url' : '/tracks/td-4-27-12.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            },  
            {   
                'trackId': 'afterHours',
                'title' : 'After Hours',
                'artist' : 'Artist 1',
                'cover' : '/images/mixes/ah.png',
                'url' : '/tracks/AfterHours.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            },
            {
                'trackId': 'brownNoise',
                'title' : 'Brown Noise Special',
                'artist' : 'Artist 2',
                'cover' : '/images/mixes/bn.jpg',
                'url' : '/tracks/BrownNoise.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            },
            {
                'trackId': 'michaelJackson',
                'title' : 'A Tribute to Michael Jackson',
                'artist' : 'Artist 3',
                'cover' : '/images/mixes/mj.jpg',
                'url' : '/tracks/MichaelJackson.mp3',
                'trackMarks' : [2.5, 5.65, 30, 40, 60,80],
                'selected' : false
            },
            {
                'trackId': 'lilWayne',
                'title' : 'Lil Wayne a Mili (Skitz Mix)',
                'artist' : 'Artist 4',
                'cover' : '/images/mixes/lw.jpg',
                'url' : '/tracks/LilWayne.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            }           

        ];

        var DJ = {};
        
        DJ.TrackListC = Backbone.Collection.extend({
            model: track.TrackM,
            initialize: function(){
            

            },
            filterList: function(){
                
                _.filter(this.models, function(tracks){
                    return console.log(tracks.get('selected') === 'true');
                });


            },
            changeTrack: function(){


            }
        });

        DJ.TrackListV = Backbone.View.extend({
            tagName: 'ul',
            className: 'track-list',
            events: {

            },
            initialize: function(){
                this.tracklist = new DJ.TrackListC(tracks);
                this.render();

            },
            render: function(){
                _.each(this.tracklist.models, function(trackM){
                    var trackItem = new track.DJ.TrackV({
                        model: trackM
                    });
                    this.$el.appendTo('body');
                    trackItem.$el.appendTo(this.$el);

                }, this);
                

            }

        });

        return DJ;
});