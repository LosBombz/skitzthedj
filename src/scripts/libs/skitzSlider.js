//plugin for the featured slider on skitzthedj.com
// Author: Carlos Escobar || aGoodRobot.com
/*global Modernizr*/
 define(['jquery'],function($){

    'use strict';
	$.fn.skitzSlider = function( options ) {
		var o = $.extend({}, {
			nextBtn: '.next',
			prevBtn: '.prev',
			display: 1
		}, options);

		var elem = {
			slideContainer: $( this ),
			slideList: $( this ).find( 'ul' ),
			slide: $( this ).find( 'li' ),
			nextBtn: $( o.nextBtn ),
			prevBtn: $( o.prevBtn )
		};

		
        // get width of slides
        var slideWidth = elem.slide.outerWidth( true );
        
        
        //get number of slides
        var slideLength = elem.slide.length;
        
       
        //increment ammount
        var increment = 0;

        
        //current active slide
        var currSlide = 0;

        
        //set width of the slider
        var listWidth = slideWidth * slideLength;

        
        //initialize the slider
        (function sliderInit(){
            elem.slideList.width( listWidth );
            elem.slideContainer.width( slideWidth * o.display );
            elem.slide.eq( currSlide ).addClass( 'activeSlide' );

        }());      
        

        var slideControl = {
            nextSlide: function( e ){
                e.preventDefault();

                if( increment > -listWidth + ( slideWidth * o.display ) ){
                    increment -= slideWidth;
                    currSlide++;
                    elem.slide.removeClass( 'activeSlide' );
                    elem.slide.eq(currSlide).addClass( 'activeSlide' );
                    
                    elem.slideList.animate({
                        left: increment
                    });
                    
                }
                else {
                    slideControl.afterLast();
                }
            },
           

            previousSlide: function( e ){
                e.preventDefault();

                if(increment < 0) {
                    currSlide--;
                    elem.slide.removeClass( 'activeSlide' );
                    elem.slide.eq( currSlide ).addClass( 'activeSlide' );
                    increment += slideWidth;
                    
                    elem.slideList.animate({
                        left: increment
                    });
                }
                else {
                    slideControl.beforeFirst();
                }
            },
            

            afterLast: function(){
                elem.slideList.stop( false, false ).animate({
                    left: increment - ( slideWidth / 4 )
                }, 200 ,function(){
                    elem.slideList.stop( false, false ).animate({
                        left: increment
                    }, 500);
                });

            },
            

            beforeFirst: function(){
                elem.slideList.stop( false, false ).animate({
                    left: increment + ( slideWidth / 4 )
                }, 200 ,function(){
                    elem.slideList.stop( false, false ).animate({
                        left: increment
                    }, 500);
                });

             }
        };
        
        
        //binds
        elem.nextBtn.on( 'click', slideControl.nextSlide );
        elem.prevBtn.on( 'click', slideControl.previousSlide );

        return this;
		
	};

 });