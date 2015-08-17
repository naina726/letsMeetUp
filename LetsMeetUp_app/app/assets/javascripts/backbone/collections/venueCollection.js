App.Collections.VenueCollection = Backbone.Collection.extend({
	initialize: function() {
		console.log("NEW VENUE COLLECTION CREATED");
	},
	model: App.Models.Venue
});