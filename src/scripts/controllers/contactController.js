/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'contact'
    
],  function( $, _, Backbone, contact){
    'use strict';

    var contactController = {};

    var contactM = new contact.ContactM();

    var contactV = new contact.ContactV({
        model: contactM
    });

    $('.footer-hook').append(contactV.render().el);

    contactController.open = function() {

        contactM.set({open: true});

    };

    contactController.close = function() {

        contactM.set({open: false});

    };



    return contactController;

});