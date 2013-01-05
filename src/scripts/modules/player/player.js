/*global console: true,_:true,Backbone:true,define:true*/

define([
    'jquery', 
    'underscore', 
    'backbone', 
    'soundmanager'
    ],
    function($, _, Backbone, soundManager){
        'use strict';


        var DJ = {};
        
        // DJ.PlayerC = Backbone.Collection.extend({
        //  initialize: function(){
        //      // this.filterList();
        //  },
        //  filterList: function(id){
        //      var track = this.filter(function(model){ return model.get('trackId') === id; });
        //      return track[0];
        //  }
        // });

        DJ.PlayerM = Backbone.Model.extend({
            defaults: {
                currTrack: '',
                durration: '',
                trackMarks: []
            }

        });

        DJ.PlayerV = Backbone.View.extend({
            tagName: 'div',
            className: 'controls-container',
            events: {

            },
            initialize: function(){
                


            },
            render: function(){
                

                return this;

            },
            loadTrack : function(id){

        
                
                
            }


        });

        DJ.app = new DJ.AppV();

        return DJ;
});