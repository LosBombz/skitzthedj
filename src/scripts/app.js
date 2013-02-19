/*global console: true,_:true,Backbone:true,require:true*/

define([
    'soundmanager',
    'jquery',
    'backbone',
    'nav',
    'router',
    'index'

], function( soundManager, $, Backbone, Nav, Router, Index ) {
    'use strict';

    var tracks = [
            {

                'trackId': 'td-4-27-12',
                'trackUrl' : '',
                'title' : 'Tommy doyles live set - 4/27/2012 ',
                'artist' : 'Artist 4',
                'cover' : '/images/mixes/td.jpg',
                'downloadUrl' : '/tracks/td-4-27-12.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            },  
            {   
                'trackId': 'afterHours',
                'title' : 'After Hours',
                'artist' : 'Artist 1',
                'cover' : '/images/mixes/ah.png',
                'downloadUrl' : '/tracks/AfterHours.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            },
            {
                'trackId': 'brownNoise',
                'title' : 'Brown Noise Special',
                'artist' : 'Artist 2',
                'cover' : '/images/mixes/bn.jpg',
                'downloadUrl' : '/tracks/BrownNoise.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            },
            {
                'trackId': 'michaelJackson',
                'title' : 'A Tribute to Michael Jackson',
                'artist' : 'Artist 3',
                'cover' : '/images/mixes/mj.jpg',
                'downloadUrl' : '/tracks/MichaelJackson.mp3',
                'trackMarks' : [2.5, 5.65, 30, 40, 60,80],
                'selected' : false
            },
            {
                'trackId': 'lilWayne',
                'title' : 'Lil Wayne a Mili (Skitz Mix)',
                'artist' : 'Artist 4',
                'cover' : '/images/mixes/lw.jpg',
                'downloadUrl': '/tracks/LilWayne.mp3',
                'trackMarks' : [10, 20, 30, 40, 60,80],
                'selected' : false
            }           

        ];

    soundManager.setup({
        url: 'media/flash/soundmanager2_flash9.swf',
        flashVersion: 9,
        useFlashBlock: false,
        ontimeout: function(error) {
        // uh-oh, SM2 failed to start - error, unsupported or other issue
            console.log('we messed up: ', error);
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
        var nav = new Nav.NavV();
        var router = new Router.TrackRouter();
        var skitzApp = new Index.AppV();
        
        $('.page-hook').prepend(skitzApp.render().el);
        
        skitzApp.renderRecent();

        skitzApp.renderList();

        $('.track-container').skitzSlider({
            display: 3
        });

        Backbone.history.start();



    });

});
