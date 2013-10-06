/*global define*/

define(['jquery', 'underscore', 'backbone', 'track.view'],
    function($, _, Backbone, TrackView){
        'use strict';

        return Backbone.View.extend({
            tagName: 'ul',
            className: 'music-list',
            events: {

            },
            initialize: function(){
               

            },
            render: function(){
                _.each(this.collection.models, function(trackModel){
                    var trackItem = new TrackView({
                        model: trackModel
                    });

                    this.$el.append(trackItem.render().el);

                }, this);
                
                return this;

            }

        });
});