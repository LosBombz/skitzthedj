/*global require*/

require([
    'soundmanager',
    'jquery',
    'backbone',
    'router',
    'playerController',
    'jquery.tm'

], function( soundManager, $, Backbone, TrackRouter, playerController) {
    'use strict';

    var app = {};

    var $initDfd = $.Deferred();
    
    soundManager.onready(function(){
        $initDfd.resolve();
    });

    
    $(function() {
        
        $initDfd.then(function(){
            playerController.tracks.createSound();
            app.router = new TrackRouter();
            Backbone.history.start();

        });
        

    });

});
