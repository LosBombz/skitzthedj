/*global console: true,_:true,Backbone:true,define:true*/


define([
    'jquery', 
    'underscore', 
    'backbone', 
    'player', 
    'featured',
    'music', 
    'contact'
    ],
    function($, _, Backbone, player, featured, music, contact){
    'use strict';
    
    var DJ = {};
    
    DJ.TrackRouter = Backbone.Router.extend({
        routes : {
        ''                   : 'index',
        '/:id'               : 'selectFeaturedTrack',
        'contact'            : 'contactPage',
        'music/:id'          : 'selectMusicTrack',
        'music'              : 'musicPage'
        },
        index : function(id) {
            

        },
        musicPage : function(id){
            
            
        },
        contactPage : function(){

        
        },
        musicDetail : function(id){
            console.log(id);
           
        }

    });

    return DJ;

});