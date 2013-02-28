/*global console: true,_:true,Backbone:true,define:true,window:true*/


define([
    'jquery', 
    'underscore', 
    'backbone',
    'soundmanager',
    'player',
    'track',
    'trackList',
    'contact',
    'tracks',
    'skitzSlider'
    ],
    function($, _, Backbone, soundManager, Player, Track, TrackList, Contact, Tracks){
    'use strict';
    
    var DJ = {};

    window.trackListC = new TrackList.TrackListC(Tracks);

    window.trackListV = new TrackList.TrackListV({
        collection: window.trackListC
    });

    window.contactM = new Contact.ContactM();

    window.contactV = new Contact.ContactV({
        model: window.contactM
    });

    $('.footer-hook').append(window.contactV.render().el);

    // window.recentListC = new TrackList.TrackListC(Tracks);

    // window.recentListV = new TrackList.RecentListV({
    //     collection: window.recentListC 
    // });

    // $('.featured-container').append(window.recentListV.render().el);
    
    $('.music-container').append(window.trackListV.render().el);
    
    // $('.featured-container').skitzSlider();

    window.playerM = new Player.PlayerM();

    window.playerV = new Player.PlayerV({
        model: window.playerM
    });


    $('.controls-container').append(window.playerV.render().el);
    
    DJ.TrackRouter = Backbone.Router.extend({
        routes : {
            ''                   : 'index',
            'tracks/:id'         : 'loadTrack',
            'tracks/:id/detail'  : 'trackDetail',
            'contact'            : 'contact'
        },
        index : function() {
            
            
        },
        loadTrack : function(id){
            console.log(id);
            var currentTrack = _.find(window.trackListC.models, function(track){
                return track.get('trackId') === id;
            }, this);

            console.log(currentTrack);

            window.playerM.set(currentTrack.toJSON());

        },
        trackDetail : function(id){
            console.log(id);
           
        },
        contact : function(){

        }

    });

    return DJ;

});