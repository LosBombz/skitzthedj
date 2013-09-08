/*global define*/

define(['jquery', 'underscore', 'backbone', 'track'],
    function($, _, Backbone, track){
        'use strict';

        var trackList = {};
        
        trackList.TrackListCollection = Backbone.Collection.extend({
            model: track.TrackModel,
            initialize: function(){

            },
            select : function(id){
               return this.findWhere({trackId : id});
            }
        });

        trackList.TrackListView = Backbone.View.extend({
            tagName: 'ul',
            className: 'music-list',
            events: {

            },
            initialize: function(){
               

            },
            render: function(){
                _.each(this.collection.models, function(trackM){
                    var trackItem = new track.TrackView({
                        model: trackM
                    });

                    this.$el.append(trackItem.render().el);

                }, this);
                
                return this;

            }

        });

        return trackList;
});