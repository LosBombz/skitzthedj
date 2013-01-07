/*global console: true,_:true,Backbone:true,define:true*/


define([
    'jquery', 
    'underscore', 
    'backbone',
    'soundmanager',
    'text!templates/controls.html'
],

function( $, _, Backbone, soundManager, controlsTmpl){
'use strict';
    var DJ = {};

    // DJ.ControlsM = Backbone.Model.extend({
    //     defaults: {
    //         trackId: '',
    //         url: '',
    //         durration: '',
    //         trackMarks: [],
    //         title: '..: DJ. Skitz --_[o - o]_-- DJ. Skitz :..',
    //         artist: ''
    //     }
    // });

    DJ.ControlsV = Backbone.View.extend({
        tagName: 'div',
        className: 'controls',
        template: _.template(controlsTmpl),
        events: {
            'click #playBtn' : 'playTrack',
            'mousedown .tracking-container' : 'seek'
        },
        initialize: function(){


        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        playTrack: function(){
            var currTrack = this.currTrack;
            console.log('toggle play');
            currTrack.togglePause();
        },
        seek: function( e ){
            console.log( e );
            var currTrack = this.currTrack;
            var pos = e.offsetX / $('.tracking-container').width() * 100;
            var setPos = pos * currTrack.duration / 100;
            console.log(pos * currTrack.duration / 100);

            currTrack.setPosition(setPos);
            $('#progressBar').css({
                width: pos + '%'
            });
            console.log('down');
                
            
        },
        toggleDetail : function(){

        }

    });
    return DJ;

});