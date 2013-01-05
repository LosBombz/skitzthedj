/*global console: true,_:true,Backbone:true,require:true, window*/

define([
    'soundmanager',
    'jquery',
    'backbone',
    'nav',
    'router'

], function( soundManager, $, Backbone, nav, router) {
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

        var appRouter = new router.TrackRouter();

        Backbone.history.start();

    });

});
