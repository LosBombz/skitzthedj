/*global console: true,_:true,Backbone:true,require:true*/

require.config({
    deps: ['app'],
    shim : {
        'tweenmax' : {
            exports: 'TweenMax'
        },
        'jquery.tm' : {
            deps: ['jquery', 'tweenmax'],
            exports: '$'
        },
            // 'timelinemax' : {
            //     deps : ['tweenmax'],
            //     exports: 'TimelineMax'
            // },
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
        }
    },
    paths : {
        
        //Libraries
        jquery       : 'components/jquery/jquery',
        soundmanager : 'components/soundmanager/script/soundmanager2',


        // modernizr : 'components/modernizr',
        underscore   : 'components/underscore/underscore',
        backbone     : 'components/backbone/backbone',
        almond       : 'components/almond/almond',
        text         : 'components/requirejs-text/text',
        d3           : 'components/d3/d3',
        tweenmax     : 'components/GreenSock-JS/src/minified/TweenMax.min',
        'jquery.tm'  : 'components/GreenSock-JS/src/minified/jquery.gsap.min',
        // timelinemax  : 'components/GreenSock-JS/src/minified/TimelineMax',


        //Core
        app          : 'app',
        core         : 'core/core',
        logger       : 'core/logger',
        router       : 'router', 

        //Sandbox
        sandbox      : 'sandbox',

        //Modules
        trackList    : 'modules/tracks/trackList',
        track        : 'modules/tracks/track',
        player       : 'modules/player/player',
        controls     : 'modules/player/controls',
        nav          : 'modules/nav/nav',


        //Controllers
        playerController : 'controllers/playerController',


        //Pages
        //layout       : 'layout',
        index        : 'index',
        contact      : 'modules/contact/contact'
    
    }
});
require( ['jquery', 'soundmanager'], function($, soundManager) { 

    soundManager.setup({
        url: '/media/flash/soundmanager2_flash9.swf',
        flashVersion: 9,
        useFlashBlock: false,
        ontimeout: function(error) {
        // uh-oh, SM2 failed to start - error, unsupported or other issue
            console.log('we messed up: ', error);
        },
        flash9Options : {
            useWaveformData: true
        }
        
    });

    soundManager.defaultOptions = {
        autoPlay: true,
        stream: true,
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
        },
        onfinish : function(){

            this.setPosition( 0 );
            this.stop();
            $('#progressBar').css({
                width: 0
            });
            $('#playBtn').text('!');
        }
    };

    soundManager.beginDelayedInit();
});
