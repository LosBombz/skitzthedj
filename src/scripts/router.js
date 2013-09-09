/*global define*/


define([
    'jquery',
    'underscore',
    'backbone',
    'playerController',
    'contactController'
    ],
    function($, _, Backbone, playerController, contactController){
    'use strict';
    
    var DJ = {};

    // $('.footer-hook').append(contactV.render().el);

    
    DJ.TrackRouter = Backbone.Router.extend({
        routes : {
            ''                   : 'index',
            '/'                  : 'index',
            'tracks/:id'         : 'loadTrack',
            'tracks/:id/detail'  : 'trackDetail',
            'contact'            : 'contact'
        },
        index : function() {
            
            contactController.close();
            
        },
        loadTrack : function(id){


            playerController.load(id);

            contactController.close();

        },
        trackDetail : function(id){
            console.log(id);
            playerController.detail(id);

            contactController.close();
           
        },
        contact : function(){
            contactController.open();
        }

    });

    return DJ;

});