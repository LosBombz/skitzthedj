/*global console: true,_:true,Backbone:true,require:true, window:true*/

require([
    'soundmanager',
    'jquery',
    'backbone',
    'nav',
    'router',
    'player',
    'jquery.tm'

], function( soundManager, $, Backbone, Nav, Router, Player) {
    'use strict';

    var app = {};

    
    soundManager.onready(function(){
        app.router = new Router.TrackRouter();
        Backbone.history.start();
    });

    
    $(function() {
        
        


        


    });

});
