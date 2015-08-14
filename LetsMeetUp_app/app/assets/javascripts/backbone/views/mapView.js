App.Views.MapView = Backbone.View.extend({
	el: 'map',
	initialize: function() {
		console.log("NEW Map VIEW CREATED");
	},
	generateMap: function(results){
		this.results = results;
		debugger;
		var mapCanvas = $('#map');
		var mapOptions = {
			center: new google.maps.LatLng(results.region.center.latitude, results.region.center.longitude),

			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(mapCanvas, mapOptions);
		var transitLayer = new google.maps.TransitLayer();
  		transitLayer.setMap(map);

	},
	generateMarkers: function(lat1, long1, lat2, long2, results) {
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
