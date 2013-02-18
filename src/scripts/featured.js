/*global console: true,_:true,Backbone:true,define:true*/

define([
    'jquery', 
    'underscore', 
    'backbone', 
    'soundmanager', 
    'skitzSlider', 
    'track', 
    'player',
    'text!templates/featured.html'
],
    function($, _, Backbone, soundManager, skitzSlider, Track, Player, featureTmpl){
        'use strict';

       

        var tracks = [
            {
                'trackId': 'td-4-27-12',
                'title' : 'Tommy doyles live set - 4/27/2012 ',
                'artist' : 'Artist 4',
                'cover' : '/images/mixes/td.jpg',
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
        
        DJ.FeaturedAppC = Backbone.Collection.extend({
            model: Track.TrackM,
            initialize: function(){

            },
            filterList: function(id){
                var track = this.filter(function(model){ 
                    return model.get('trackId') === id; 
                });
                return track[0];
            }
        });

        DJ.FeaturedAppV = Backbone.View.extend({
            tagName: 'div',
            className: 'featured-container',
            template: _.template(featureTmpl),
            events: {

            },
            initialize: function(){
                console.log('Featured App Init');
                this.trackList = new DJ.FeaturedAppC(tracks);

            },
            render: function(){
                this.$el.html(this.template()).appendTo('.page-hook');
                
                this.renderList();

                   $('.track-container').skitzSlider({
                        display: 3
                    });

            },
            renderList: function(){
                _.each(this.trackList.models, function(trackM){
                    var trackItem = new Track.TrackV({
                        model: trackM
                    });
                    trackItem.$el.appendTo('.track-list');

                }, this);
                console.log('render list');

            },
            loadTrack : function(id){
                $('.controls').remove();
                var currTrack = this.trackList.filterList(id);
                
                var controls = new Player.PlayerV({
                    model: new Track.TrackM(currTrack.toJSON())
                });
                console.log('loadTrack');
                soundManager.onready(function(){
                    controls.loadTrack();
                });
                
            },
            changePage: function(){
                if(!$('.featured-container').length){
                    console.log('Change to Featured');
                    var selfView = this;
                    $('.page-hook').fadeOut('fast', function(){
                        $('.page-hook').empty();
                        selfView.render();
                         $('.page-hook').fadeIn('fast');

                    });
                }
                

            }


        });

        DJ.featuredApp = new DJ.FeaturedAppV();

        return DJ;
});