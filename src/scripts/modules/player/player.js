/*global console: true,_:true,Backbone:true,define:true, d3:true*/


define([
    'jquery', 
    'underscore', 
    'backbone',
    'soundmanager',
    'text!modules/player/templates/controls.html',
    'd3'
],

function( $, _, Backbone, soundManager, controlsTmpl ){
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
                    $('.title').text(Math.round(this.bytesLoaded/this.bytesTotal *100) + '%');

                    if(this.bytesLoaded === this.bytesTotal) {
                        console.log('loaded');
                        track.trigger('change');
                    }
                },
                whileplaying : function(){
                    var currentTrack = this;
                    var waveData = this.waveformData;
                    var waveScale = 10;
                    var pos = ( currentTrack.position / currentTrack.duration ) * 100;
                    
                    $('#duration').text(toMinutes(this.position) + ' / ' + toMinutes(this.duration) );

                    $('#progressBar').css({
                        width: pos + '%'
                    });

                    // $.each(waveData, function(i,v){
                    //      visualizer(v);
                    
                    //     //console.log(i,v);
                    // });

                   visualizer(waveData.left, waveData.right);

                    //console.log(waveData);

        
                }

            });
            

            currentTrack = soundManager.getSoundById(trackId);

            this.model.set({currentTrack: currentTrack}, {silent:true});

        },
        playTrack: function(e){
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

            console.log( e );

            //fix for firefox
            if (e.offsetX === undefined) {
                e.offsetX = e.pageX-$('.tracking-container').offset().left;
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
        // console.log(wavedata);

        var w = 10;
        var h = 100;
        var barPadding = 20;

        var scale = d3.scale.linear();

        var svg = d3.select('svg');

        var circlesL = svg.selectAll(".left")
            .data(wavedataL);

        var circlesR = svg.selectAll(".right")
            .data(wavedataR);
            
           

        

        svg.attr("width", 100 + '%')
            .attr("height", 100 + '%');
            

        circlesL.enter()
            .append("circle")
            .classed('left', true);
        


        circlesL.exit().remove();

        circlesL
            .attr('fill', function(d, i){
                var colorData =  Math.round(Math.abs(d) * 300);
                if (colorData < 100) {
                    colorData = 150;
                }

                if(i < 150) {
                    i = 100;
                }
                return 'rgba(' + i + ',20,' + colorData + ', .4)';
            })
            .transition()           
            .attr('r', function(d){
                //console.log(d);
                return Math.abs(d) * 300 + 5;
            })
            .attr('cx', function(d, i){
                //console.log(d);
                return (Math.random() * 200 ) * d  + i * 5 + 'px';
            })
            .attr('cy', function(d){
                //console.log(d);
                return (Math.random() * 500 ) * d + 400 + 'px';
            });


        circlesR.enter()
            .append("circle")
            .classed('right', true);
        


        circlesR.exit().remove();

        circlesR
            .attr('fill', function(d, i){
                var colorData =  Math.round(Math.abs(d) * 300);
                if (colorData < 100) {
                    colorData = 150;
                }

                if(i < 100) {
                    i = 100;
                }
                return 'rgba(' + colorData + ', 20 ,' + i + ', .4)';
            })
            .transition()           
            .attr('r', function(d){
                //console.log(d);
                return Math.abs(d) * 300 + 5;
            })
            .attr('cx', function(d, i){
                //console.log(d);
                return (Math.random() * 200 ) * d  + i * 5 + 'px';
            })
            .attr('cy', function(d){
                //console.log(d);
                return (Math.random() * 500 ) * d + 400 + 'px';
            });


            
            

        

    }


    function pad( number, width ) {
        width -= number.toString().length;
        if ( width > 0 ) {
            return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
        }
        return number + ""; // always return a string
    }

    function toMinutes (milliseconds) {
        var seconds = milliseconds / 1000;

        var numSeconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
        var numMinutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);


        return pad(numMinutes, 2) + ':' + pad(numSeconds, 2); 
    }
    return DJ;

});