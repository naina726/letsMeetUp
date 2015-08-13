App.Views.MapView = Backbone.View.extend({
	el: 'map',
	initialize: function() {
		console.log("NEW Map VIEW CREATED");
	},
	generateMap: function(data, results){
		var mapCanvas = $('#map');
		var mapOptions = {
			center: new google.maps.LatLng(44.5403, -78.5463),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(mapCanvas, mapOptions);

	},
	generateMarkers: function(data, results) {
		console.log("MAPVIEW GENERATE MARKERS YAY")	
	},
	events: {
		'click #option1': 'viewFirst'
		//jQuery event on div that has been clicked
	},
	viewFirst: function(){
		//slide down to show more information for 
		//first option from list 
		//and highlight pin on map
	}

});
