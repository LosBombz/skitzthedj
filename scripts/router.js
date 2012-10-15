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
		''             : 'root',
		'contact'	   : 'contactPage',
		'featured/:id' : 'selectFeaturedTrack',
		'music/:id'    : 'selectMusicTrack',
		'music'        : 'musicPage'
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
		root: function() {
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
		}

	});

	return {
		DJ: DJ
	};

});