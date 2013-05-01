/*global console: true,_:true,Backbone:true,define:true,window:true*/


define([
    'jquery', 
    'underscore', 
    'backbone',
    'playerController',
    'contact'
    ],
    function($, _, Backbone, playerController, Contact){
    'use strict';
    
    var DJ = {};


    window.contactM = new Contact.ContactM();

    window.contactV = new Contact.ContactV({
        model: window.contactM
    });

    $('.footer-hook').append(window.contactV.render().el);

    
    DJ.TrackRouter = Backbone.Router.extend({
        routes : {
            ''                   : 'index',
            'tracks/:id'         : 'loadTrack',
            'tracks/:id/detail'  : 'trackDetail',
            'contact'            : 'contact'
        },
        index : function() {
            
            
        },
        loadTrack : function(id){


            playerController.load(id);

        },
        trackDetail : function(id){
            console.log(id);
            playerController.detail(id);
           
        },
        contact : function(){
            console.log('contact');
        }

    });

    return DJ;

});