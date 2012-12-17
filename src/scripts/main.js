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
        modernizr    : '/scripts/libs/modernizr',
        underscore   : '/scripts/libs/underscore-min',
        backbone     : '/scripts/libs/backbone-min',
        skitzSlider  : '/scripts/libs/skitzSlider'
        //modules
    
    }
});
define([
    'soundmanager',
    'jquery',
    'backbone',
    'modules/nav',
    'router',
    'skitzSlider'

], function( soundManager, $, Backbone, Nav, Router) {
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
            useWaveformData: false
        }
        
    });

    soundManager.defaultOptions = {
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
        };

    soundManager.beginDelayedInit();
    
    $(function() {
        var nav = new Nav.DJ.NavV();
        
        var router = new Router.DJ.TrackRouter();

        Backbone.history.start();

    });

});
