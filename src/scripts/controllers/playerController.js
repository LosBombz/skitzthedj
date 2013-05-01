define([
    'jquery', 
    'underscore', 
    'backbone',
    'soundmanager',
    'player',
    'trackList',
    'tracks',
    'd3'
    
],  function( $, _, Backbone, soundManager, Player, Tracklist, tracks){
    'use strict';

    var player = {};

    player.load = function(id) {
        console.log(id);
        var track = _.find(player.tracks.models, function(track){
            return track.get('trackId') === id;
        }, this);



        player.model.set(track.toJSON());
    };


    player.detail = function(id){
        console.log('detail for: ', id);
    };

    player.model = new Player.PlayerM();

    player.view = new Player.PlayerV({
        model: player.model
    });

    player.tracks = new Tracklist.TrackListC(tracks);

    player.tracksView = new Tracklist.TrackListV({
        collection: player.tracks
    });


    $('.controls-container').append(player.view.render().el);
    $('.music-container').append(player.tracksView.render().el);

    return player;

});