/*global console: true,_:true,Backbone:true,require:true, window:true*/

define([
    'soundmanager',
    'jquery',
    'backbone',
    'nav',
    'router',
    'player',
    'track'

], function( soundManager, $, Backbone, Nav, Router, Player) {
    'use strict';

    var app = {};

    
    soundManager.onready(function(){
        app.router = new Router.TrackRouter();
        Backbone.history.start();
    });

    
    $(function() {
        // app.nav = new Nav.NavV();
        
        // app.skitzApp = new Index.AppV();
        
        // $('.page-hook').prepend(app.skitzApp.render().el);

        // $('.track-container').skitzSlider({
        //     display: 3
        // });
        


        


    });

    return app;

});
