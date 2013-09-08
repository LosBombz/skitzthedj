/*global define*/


define([
    'jquery',
    'underscore',
    'backbone',
    'core',
    'soundmanager',
    'text!modules/player/templates/controls.html',
    'd3'
],

function( $, _, Backbone, core, soundManager, controlsTmpl ){
'use strict';
    var DJ = {};
    DJ.PlayerM = Backbone.Model.extend({
        defaults: {
            'currentTrack': null,
            'title' : '__--::[DJ SKITZ]::--__',
            'trackId' : '',
            'trackUrl' : '',
            'artist' : 'unknown',
            'cover' : '/images/mixes/no-cover.jpg',
            'downloadUrl' : '',
            'trackMarks' : [],
            'type' : 'Live Set'
        }
    });


    DJ.PlayerV = Backbone.View.extend({
        tagName: 'div',
        className: 'controls',
        template: _.template(controlsTmpl),
        events: {
            'click #playBtn' : 'playTrack',
            'mousedown .tracking-container' : 'seek'
        },
        initialize: function(){
            //this.model.on('change:trackUrl', this.loadTrack, this);
            this.model.on('change:title', this.renderTitle ,this);
            this.model.on('change:time', this.renderTime , this);
            this.model.on('change:progress', this.renderProgress , this);
            this.model.on('change:loaded', this.renderLoaded , this);

        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        renderTitle : function(){

            var title = this.model.get('title');

            this.$('.title').text(title);


        },
        renderLoaded : function() {
            var loaded = this.model.get('loaded');

            this.$('#loadingBar').css({
                width: loaded
            });

        },
        renderProgress : function(){
            var progress = this.model.get('progress');

            this.$('#progressBar').css({
                width: progress
            });
        },
        renderTime : function() {
            this.$('#duration').text(this.model.get('time'));
        },
        playTrack: function( e ){
            e.preventDefault();
            

            this.model.set({playing: true});

            //console.log('toggle play');
            
        },
        seek: function( e ){

            var currentTrack = this.model.get('currentTrack');

            if(!currentTrack){
                return false;
            }

            //fix for firefox
            if (typeof e.offsetX === 'undefined') {
                e.offsetX = e.pageX - this.$('.tracking-container').offset().left;
            }

            var pos = e.offsetX / this.$('.tracking-container').width() * 100;
            var setPos = parseInt(pos * currentTrack.duration / 100, 10);

            this.model.set({position: setPos});

            this.$('#progressBar').css({
                width: pos + '%'
            });


                
            
        }

    });

    

    // function visualizer (wavedataL, wavedataR) {
        


    // }


    function pad( number, width ) {
        width -= number.toString().length;
        if ( width > 0 ) {
            return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
        }
        return number + ''; // always return a string
    }

    function toMinutes (milliseconds) {
        var seconds = milliseconds / 1000;

        var numSeconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
        var numMinutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);


        return pad(numMinutes, 2) + ':' + pad(numSeconds, 2);
    }
    
    return DJ;

});