/*global console: true,_:true,Backbone:true,define:true*/


define([
    'jquery', 
    'underscore', 
    'backbone', 
    'track', 
    'player', 
    'index',
    'music', 
    'contact'
    ],
    function($, _, Backbone, Track, Player, Index, MusicApp, Contact){
    'use strict';
    
    var DJ = {};
    
    DJ.TrackRouter = Backbone.Router.extend({
        routes : {
        ''                   : 'index',
        'music/:id'          : 'index',
        'contact'            : 'contactPage',
        // 'featured/:id'       : 'selectFeaturedTrack',
        // 'music/:id'          : 'selectMusicTrack',
        'music/:id/detail'   : 'musicDetail'
        // 'music'              : 'musicPage'
        },
        // selectMusicTrack : function(id) {
        //     if(Contact.contact.isOpen){
        //         Contact.contact.close();
        //     }
        //     MusicApp.musicApp.loadTrack(id);
        //     MusicApp.musicApp.changePage();
        //     console.log(id);
        // },
        // selectFeaturedTrack : function(id){
        //     if(Contact.contact.isOpen){
        //         Contact.contact.close();
        //     }
        //     FeaturedApp.featuredApp.loadTrack(id);
        //     FeaturedApp.featuredApp.changePage();
        // },
        index : function(id) {
            if(Contact.contact.isOpen){
                Contact.contact.close();
            }
            if(id){
                Index.appView.loadTrack(id);
            }
        },
        // ,
        // musicPage : function(){
            
        //     if(Contact.contact.isOpen){
        //         Contact.contact.close();
        //     }
        //     MusicApp.musicApp.changePage();
            
        // },
        contactPage : function(){
            console.log(Contact.contact.isOpen);
            Contact.contact.open();
        }
        // musicDetail : function(id){
        //     console.log(id);
           
        // }

    });

    return DJ;

});