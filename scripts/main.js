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
        underscore   : '/scripts/libs/underscore-min',
        backbone     : '/scripts/libs/backbone-min',
        skitzSlider  : '/scripts/libs/skitzSlider'
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

    soundManager.setup({
        url: 'motion/flash/soundmanager2_flash9.swf',
        flashVersion: 9,
        useFlashBlock: false,
        ontimeout: function(error) {
        // uh-oh, SM2 failed to start - error, unsupported or other issue
            console.log('we messed up');
        },
        flash9Options : {
            useWaveformData: true
        },
        defaultOptions : {
            autoLoad: true,
            onplay: function(){
                $('#playBtn').text('"');
            },
            onstop: function(){
                $('#playBtn').text('!');
            },
            onpause: function(){
               $('#playBtn').text('!');
            },
            onresume : function(){
                $('#playBtn').text('"');
            }
        }
    });

    soundManager.beginDelayedInit();
    
    $(function() {
        var nav = new Nav.DJ.NavV();
        
        var router = new Router.DJ.TrackRouter();

        Backbone.history.start();

    });

});
