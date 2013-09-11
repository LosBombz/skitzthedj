/*global define*/
define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
	var core = {};

	core.debug = true;

	// extend backbone events into the cor object
	_.extend(core, Backbone.Events);
	 

	return core;
});