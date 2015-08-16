App.Collections.VenueCollection = Backbone.Collection.extend({
	initialize: function() {
		console.log("NEW VENUE COLLECTION CREATED");
	},
	Model: App.Models.Venue
});