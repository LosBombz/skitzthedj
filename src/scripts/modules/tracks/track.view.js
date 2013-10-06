/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'tweenmax',
    'text!modules/tracks/templates/track.html'
],

function($, _, Backbone, TweenMax, trackTmpl){
'use strict';

    return Backbone.View.extend({
        tagName: 'li',
        className: 'track',
        template: _.template(trackTmpl),
        events: {
            'mouseenter' : 'over',
            'mouseleave' : 'out'
        },
        initialize: function(){
            this.render();
            this.model.on('change:selected', function(model){

                this[model.get('selected') ? 'select' : 'deselect']();

            }, this);
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        select: function(){

            this.$el.find('a').addClass('selected');

            // this.$el.append($('<div />', {
            //     text: 'SELECTED!',
            //     'class' : 'selected',
            //     css: {
            //         position: 'absolute',
            //         zIndex: '99'
            //     }
            // }));
        },
        deselect: function(){

            this.$el.find('a').removeClass('selected');

        },
        over : function(){
            TweenMax.to(this.$el.find('a'), 0.4, {
                boxShadow: '0px 8px 11px rgba(50, 50, 50, 0.92)',
                scale: 1.05
            });
        },
        out: function() {
            TweenMax.to(this.$el.find('a'), 0.4, {
                boxShadow: 0,
                scale: 1
            });
        }
    });
});