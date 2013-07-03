define(['jquery', 'underscore', 'logger', 'backbone'], function($, _, Logger, Backbone){
	var core = {};

	core.debug = true;

	core.Logger = Logger;

	var logger = new core.Logger('Core');

	// extend backbone events into the cor object
	_.extend(core, Backbone.Events);


	logger.log('App Starting');
	 

	return core;
});