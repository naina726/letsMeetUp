App.Views.MapView = Backbone.View.extend({
	el: 'map',
	initialize: function() {
		console.log("NEW Map VIEW CREATED");
	},
	storeShit: function(lat1, long1, lat2, long2){
		this.lat1 = lat1;
        this.long1 = long1;
        this.lat2 = lat2;
        this.long2 = long2;
	},
	getAvg: function(){
		var self = this;
		data = {
            lat1: this.lat1,
            long1: this.long1,
            lat2: this.lat2,
            long2: this.long2
        };
        console.log(data)
		$.ajax({
            method: 'POST',
            url: '/yelps/midpoint',
            data: data
        }).done(function(midpoint){
            self.avgLat = midpoint[0];
            self.avgLong = midpoint[1];
            self.generateMap()
        }).fail(function(){
        	alert("something is wrong")
        })
	},
	generateMap: function(){
		var self = this;
		var mapCanvas = $('#map')[0];
		var mapOptions = {
			center: new google.maps.LatLng(this.avgLat, this.avgLong),
			zoom: 11,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(mapCanvas, mapOptions);
		$("#holder").css("visibility", "visible");
		setTimeout(function(){self.generateMarkers()}, 200);
		//var transitLayer = new google.maps.TransitLayer();
  		//transitLayer.setMap(map);

	},
	generateMarkers: function() {
		console.log("MAPVIEW GENERATE MARKERS YAY" + this.lat1);
		var labels = '12345';
		var labelIndex = 0;
		var yelpCoordinates = [];
		for (var j = 0; j < App.collection.models.length; j++ ) {
			yelpCoordinates.push(App.collection.models[j].attributes.hash.location.coordinate.latitude);
			yelpCoordinates.push(App.collection.models[j].attributes.hash.location.coordinate.longitude);

		};
		locations = [
			{lat: this.lat1, lng: this.long1},
			{lat: this.lat2, lng: this.long2},
			{lat: this.avgLat, lng: this.avgLong},
			{lat: yelpCoordinates[0], lng: yelpCoordinates[1]},
			{lat: yelpCoordinates[2], lng: yelpCoordinates[3]},
			{lat: yelpCoordinates[4], lng: yelpCoordinates[5]},
			{lat: yelpCoordinates[6], lng: yelpCoordinates[7]},
			{lat: yelpCoordinates[8], lng: yelpCoordinates[9]}
		];
		var markers = [];
		var self = this;
		var midpointImage = '/midpoint.png';
		var placesImage = '/places.png';
		for( var i = 0; i < locations.length; i++ ){
			if (i < 2){
				addMarkerWithTimeout(locations[i], i * 200)
			}
			else if (i == 2){ 
				addMidpointMarker(locations[i], i * 200, midpointImage) 
			}
			else {
				addCustomMarker (locations[i], i * 200, placesImage)
			}
		};
		function addMarkerWithTimeout(position, timeout) {
			setTimeout(function(){
				markers.push(new google.maps.Marker({
					position: position,
					map: self.map,
					animation: google.maps.Animation.DROP
				}));
			}, timeout);
		};
		function addMidpointMarker(position, timeout, image) {
			setTimeout(function(){
				markers.push(new google.maps.Marker({
					position: position,
					map: self.map,
					animation: google.maps.Animation.DROP,
					icon: image
				}));
			}, timeout);
		};
		function addCustomMarker(position, timeout, image) {
			setTimeout(function(){
				markers.push(new google.maps.Marker({
					position: position,
					map: self.map,
					animation: google.maps.Animation.DROP,
					icon: image,
					label: labels[labelIndex++]
				}));
			}, timeout);
		};

	},

	events: {
		'click #marker': 'viewMore'
		//jQuery event on div that has been clicked
	},
	viewMore: function(){
		//slide down to show more information for 
		//first option from list 
		//and highlight pin on map
	}

});
