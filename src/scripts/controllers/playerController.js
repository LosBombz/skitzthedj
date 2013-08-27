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
        console.log(id);

        if(current) {
            current.set({selected:false});
        }

        var track = _.find(player.tracks.models, function(track){
            return track.get('trackId') === id;
        }, this);

        track.set({selected:true});
        
        current = track;



        console.log(current);

        player.model.set(track.toJSON());
    };


    player.detail = function(id){
        console.log('detail for: ', id);
    };

    player.model = new controls.PlayerM();

    player.view = new controls.PlayerV({
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