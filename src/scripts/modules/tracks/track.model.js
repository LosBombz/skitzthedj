/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
],

function($, _, Backbone){
'use strict';

    return Backbone.Model.extend({
        defaults : {
            'trackId' : '',
            'trackUrl' : '',
            'title' : 'Track',
            'artist' : 'unknown',
            'cover' : '/images/mixes/no-cover.jpg',
            'downloadUrl' : '',
            'trackMarks' : [],
            'type' : 'Live Set',
            'selected' : false
        },
        initialize : function(){

        }
    });
    
});