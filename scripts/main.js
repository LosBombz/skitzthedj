/*global console: true,_:true,Backbone:true,require:true*/

require.config({
    shim : {
        'soundmanager' : {
            exports: 'soundManager'
        },
        'underscore' : {
            exports : '_'
        },
        'backbone': {
            deps : [
                'underscore',
                'jquery'
            ],
            exports : 'Backbone'    
        },
        'skitzSlider' : {
            deps : [
                'jquery'
            ]
        }
    },
    paths : {
        soundmanager : '/scripts/libs/soundmanager2',
        underscore : '/scripts/libs/underscore-min',
        backbone : '/scripts/libs/backbone-min',
        skitzSlider: '/scripts/libs/skitzSlider'
    }
});
require([
    'soundmanager',
    'jquery',
    'underscore',
    'backbone',
    'skitzSlider',
    'modules/nav',
    'modules/track',
    'modules/player',
    'modules/contact',
    'router',
    'featuredApp',
    'musicApp'


], function( soundManager, $, _, Backbone, skitzSlider, Nav, Track, Player, Contact, Router, FeaturedApp, MusicApp) {
    'use strict';
    
    $(function() {
        var nav = new Nav.DJ.NavV();
        

        var router = new Router.DJ.TrackRouter();
        Backbone.history.start();

    });

});
