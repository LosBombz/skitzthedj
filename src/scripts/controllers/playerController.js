/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'soundmanager',
    'player',
    'controls',
    'trackList',
    'tracks',
    'd3'
    
],  function( $, _, Backbone, soundManager, Player, controls, Tracklist, tracks){
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

    player.tracks = new Tracklist.TrackListCollection(tracks);

    player.tracksView = new Tracklist.TrackListView({
        collection: player.tracks
    });

    player.player = new Player({
        model: player.model
    });


    $('.controls-container').append(player.view.render().el);
    $('.music-container').append(player.tracksView.render().el);

    return player;

});