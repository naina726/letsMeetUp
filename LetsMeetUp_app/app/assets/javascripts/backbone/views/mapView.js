App.Views.MapView = Backbone.View.extend({
	el: 'map',
	initialize: function() {
		console.log("NEW Map VIEW CREATED");
			var mapCanvas = $('#map');
			var mapOptions = {
				center: new google.maps.LatLng(44.5403, -78.5463),
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(mapCanvas, mapOptions);
	},
	google.maps.event.addDomListener(window, 'load', initialize);

});
