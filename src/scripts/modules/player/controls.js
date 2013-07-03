/*global console: true,_:true,Backbone:true,define:true, d3:true*/


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
            this.model.on('change:trackUrl', this.loadTrack, this);
            this.model.on('change', this.renderDisplay,this);
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        renderDisplay : function(){

            var title = this.model.get('title');

            this.$('.title').text(title);

        },
        loadTrack : function(track){
            console.log('LOAD TRACK');
            var trackId = track.get('trackId');
            var url = track.get('trackUrl');
            var trackModel = this.model;
            var currentTrack;

            if(track.get('currentTrack')) {
                track.get('currentTrack').destruct();
            }
           
            soundManager.createSound({
                id: trackId,
                url: url,
                whileloading: function(){
                    $('#loadingBar').css({
                        width: Math.round(this.bytesLoaded/this.bytesTotal * 100) + '%'
                    });

                    console.log(this.buffered);
                },
                whileplaying : function(){
                    var currentTrack = this;
                    var waveData = this.waveformData;

                    var pos = ( currentTrack.position / currentTrack.duration ) * 100;
                    
                    $('#duration').text(toMinutes(this.position) + ' / ' + toMinutes(this.duration) );

                    $('#progressBar').css({
                        width: pos + '%'
                    });


                   //visualizer(waveData.left, waveData.right);

        
                },
                onload : function(){
                    console.log('LOADED');
                }

            });
            

            currentTrack = soundManager.getSoundById(trackId);

            this.model.set({currentTrack: currentTrack}, {silent:true});

        },
        playTrack: function( e ){
            e.preventDefault();
            var currentTrack = this.model.get('currentTrack');

            if(!currentTrack){
                return false;
            }

            console.log('toggle play');
            currentTrack.togglePause();
        },
        seek: function( e ){

            if(!this.model.get('currentTrack')){
                return false;
            }

            //fix for firefox
            if (e.offsetX === undefined) {
                e.offsetX = e.pageX - $('.tracking-container').offset().left;
            }

            var currentTrack = this.model.get('currentTrack');

            var pos = e.offsetX / this.$('.tracking-container').width() * 100;
            var setPos = parseInt(pos * currentTrack.duration / 100, 10);

            currentTrack.setPosition(setPos);

            $('#progressBar').css({
                width: pos + '%'
            });


                
            
        }

    });

    

    function visualizer (wavedataL, wavedataR) {
        


    }


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