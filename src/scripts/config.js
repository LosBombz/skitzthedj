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
        jquery          : 'libs/jquery-1.8.1.min',
        soundmanager    : 'libs/soundmanager2',
        modernizr       : 'libs/modernizr',
        underscore      : 'libs/underscore-min',
        backbone        : 'libs/backbone-min',
        skitzSlider     : 'libs/skitzSlider',
        text            : 'libs/text',

        //Core
        app             : 'app',
        router          : 'router',

        //Modules
        player          : 'modules/player/main',
        nav             : 'modules/navigation/main',


        //Pages
        page            : 'modules/page/main',
        featured        : 'modules/featuredPage/main',
        music           : 'modules/musicPage/main',
        contact         : 'modules/contactPage/main'
    
    }
});
define( function() { /* Define call for enforce define */ } );
