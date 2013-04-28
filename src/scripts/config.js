/*global console: true,_:true,Backbone:true,require:true*/

require.config({
    enforceDefine : true,
    deps: ['app'],
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
        //Libraries
        jquery       : 'components/jquery/jquery',
        soundmanager : 'components/soundmanager/script/soundmanager2',
        // modernizr    : 'components/modernizr',
        underscore   : 'components/underscore/underscore',
        backbone     : 'components/backbone/backbone',
        almond       : 'components/almond/almond',
        text         : 'components/requirejs-text/text',
        skitzSlider  : 'components/skitzSlider',
        d3           : 'components/d3/d3',


        //Core
        app          : 'app',
        core         : 'core',
        router       : 'router', 

        //Sandbox
        sandbox      : 'sandbox',

        //Modules
        trackList    : 'modules/tracks/trackList',
        track        : 'modules/tracks/track',
        player       : 'modules/player/player',
        nav          : 'modules/nav/nav',


        //Pages
        //layout       : 'layout',
        index        : 'index',
        contact      : 'modules/contact/contact'
    
    }
});
define( ['soundmanager'], function(soundManager) { 

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
