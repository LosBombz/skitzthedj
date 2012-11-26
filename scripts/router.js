/*global console: true,_:true,Backbone:true,define:true*/


define([
    'jquery', 
    'underscore', 
    'backbone', 
    'modules/track', 
    'modules/player', 
    'featuredApp',
    'musicApp', 
    'modules/contact'
    ],
    function($, _, Backbone, Track, Player, FeaturedApp, MusicApp, Contact){
    'use strict';
    
    var DJ = {};
    
    DJ.TrackRouter = Backbone.Router.extend({
        routes : {
        ''                   : 'index',
        'contact'            : 'contactPage',
        'featured/:id'       : 'selectFeaturedTrack',
        'music/:id'          : 'selectMusicTrack',
        'music/:id/detail'   : 'musicDetail',
        'music'              : 'musicPage'
        },
        selectMusicTrack : function(id) {
            if(Contact.DJ.contact.isOpen){
                Contact.DJ.contact.close();
            }
            MusicApp.DJ.musicApp.loadTrack(id);
            MusicApp.DJ.musicApp.changePage();
            console.log(id);
        },
        selectFeaturedTrack : function(id){
            if(Contact.DJ.contact.isOpen){
                Contact.DJ.contact.close();
            }
            FeaturedApp.DJ.featuredApp.loadTrack(id);
            FeaturedApp.DJ.featuredApp.changePage();
        },
        index : function() {
            if(Contact.DJ.contact.isOpen){
                Contact.DJ.contact.close();
            }
            FeaturedApp.DJ.featuredApp.changePage();
        },
        musicPage : function(){
            
            if(Contact.DJ.contact.isOpen){
                Contact.DJ.contact.close();
            }
            MusicApp.DJ.musicApp.changePage();
            
        },
        contactPage : function(){
            console.log(Contact.DJ.contact.isOpen);
            Contact.DJ.contact.open();
        },
        musicDetail : function(id){
            console.log(id);
           
        }

    });

    return {
        DJ: DJ
    };

});