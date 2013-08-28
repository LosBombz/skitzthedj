/*global require*/

require([
    'soundmanager',
    'jquery',
    'backbone',
    'router',
    'jquery.tm'

], function( soundManager, $, Backbone, Router) {
    'use strict';

    var app = {};

    
    soundManager.onready(function(){
        app.router = new Router.TrackRouter();
        Backbone.history.start();
    });

    
    $(function() {
        
        


    });

});
