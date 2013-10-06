/*global define*/
define([
    'jquery',
    'underscore',
    'player',
    'controls',
    'tracklist.collection',
    'tracklist.view',
    'tracks'
    
],  function( $, _, Player, controls, TracklistCollection, TracklistView, tracks){
    'use strict';

    var player = {};

    var current;

    player.load = function(id) {

        if(current) {
            current.set({selected:false});
        }
        
        var loadedTrack = player.tracks.select(id);

        loadedTrack.set({selected:true});
        
        current = loadedTrack;



        //console.log(current);

        player.model.set(loadedTrack.toJSON());
    };


    player.detail = function(/*id*/){
        //console.log('detail for: ', id);
    };

    player.model = new controls.PlayerM();

    player.view = new controls.PlayerV({
        model: player.model
    });

    player.tracks = new TracklistCollection(tracks);

    player.tracksView = new TracklistView({
        collection: player.tracks
    });

    player.player = new Player({
        model: player.model
    });


    $('.controls-container').append(player.view.render().el);
    $('.music-container').append(player.tracksView.render().el);

    return player;

});