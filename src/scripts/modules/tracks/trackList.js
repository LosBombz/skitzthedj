/*global console: true,_:true,Backbone:true,define:true*/

define(['jquery', 'underscore', 'backbone', 'track'],
    function($, _, Backbone, track){
        'use strict';

        var DJ = {};
        
        DJ.TrackListC = Backbone.Collection.extend({
            model: track.TrackM,
            initialize: function(){
            

            }
        });

        DJ.TrackListV = Backbone.View.extend({
            tagName: 'ul',
            className: 'music-list',
            events: {

            },
            initialize: function(){
               

            },
            render: function(){
                _.each(this.collection.models, function(trackM){
                    var trackItem = new track.TrackV({
                        model: trackM
                    });
                    this.$el.append(trackItem.render().el);

                }, this);
                
                return this;

            }

        });

        return DJ;
});