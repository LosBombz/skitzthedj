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
        jquery       : 'libs/jquery/jquery',
        soundmanager : 'libs/soundmanager/script/soundmanager2',
        // modernizr    : 'libs/modernizr',
        underscore   : 'libs/underscore/underscore',
        backbone     : 'libs/backbone/backbone',
        almond       : 'libs/almond/almond',
        text         : 'libs/requirejs-text/text',
        skitzSlider  : 'libs/skitzSlider',


        //Core
        app          : 'app',
        core         : 'core',
        router       : 'router', 

        //Sandbox
        sandbox      : 'sandbox',

        //Modules
        track        : 'modules/tracks/track',
        player       : 'modules/player/player',
        nav          : 'modules/nav/nav',


        //Pages
        layout       : 'layout',
        featured     : 'featured',
        music        : 'music',
        contact      : 'modules/contact/contact'
    
    }
});
define( function() { /* Define call for enforce define */ } );
