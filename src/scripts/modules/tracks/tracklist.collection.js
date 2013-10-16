/*global define*/

define(['jquery', 'underscore', 'backbone', 'track.model'],
    function($, _, Backbone, TrackModel){
        'use strict';



        return Backbone.Collection.extend({
            model: TrackModel,
            initialize: function(){
              
            },
            select : function(id){
               return this.findWhere({trackId : id});
            }
        });



});