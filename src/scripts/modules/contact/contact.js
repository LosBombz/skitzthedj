/*global console: true, define:true*/

define(['jquery', 'underscore', 'backbone', 'text!modules/contact/templates/contact.html', 'greensockJquery'],

function($, _, Backbone, contactTmpl){
'use strict';

    var DJ = {};

    DJ.ContactM = Backbone.Model.extend({
        defaults : {
            'content': '',
            'open': false
        },
        initialize : function(){

        }
    });

    DJ.ContactV = Backbone.View.extend({
        tagName: 'div',
        className: 'footer-wrap',
        template: _.template(contactTmpl),
        events: {
            'click .contact-btn' : 'openToggle'
        },
        initialize : function(){
            this.model.on('change:open', this.openToggle, this);
        },
        render : function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        openToggle : function(){

            if(this.model.get('open')){

                this.close();

            } else {

                this.open();

            }

        },
        open : function(){
            var $el = this.$el;
            this.model.set({
                    open:true
                }, 
                {
                    silent:true
            });

            this.$el.css({ bottom: ''});
            this.$el.height($(window).height() - 61)
                .css({
                    top: $el.height() + 30
                });
            this.$el.animate({top: 61});


            $(window).on('resize', function(){
                 $('.footer-wrap').height($(window).height() - 61);
            });

        },
        close : function(){
            var $el = this.$el;
            this.model.set({open:false}, {silent:true});

            $(window).off('resize');

            this.$el.animate(
                {
                    top: $(window).height() + -30
                }, {
                    complete : function(){
                        $el.height(30);
                        $el.css({top: '', bottom: 0});
                    },
                    easing: 'easeOutQuad'
                }
            );
        }
    
    });




    return DJ;

});