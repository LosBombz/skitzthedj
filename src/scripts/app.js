/*global require*/

require([
    'soundmanager',
    'jquery',
    'backbone',
    'router',
    'jquery.tm'

], function( soundManager, $, Backbone, TrackRouter) {
    'use strict';

    var app = {};

    var $initDfd = $.Deferred();
    
    soundManager.onready(function(){
        $initDfd.resolve();
    });

    
    $(function() {
        
        $initDfd.then(function(){
            app.router = new TrackRouter();
            Backbone.history.start();

        });
        

    });

});
