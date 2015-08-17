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
		locations = [
			{lat: this.lat1, lng: this.long1},
			{lat: this.lat2, lng: this.long2},
			{lat: this.avgLat, lng: this.avgLong}
		];
		var markers = [];
		var self = this;
		var midpointImage = '/midpoint.png'
		var placesImage = '/places.png'
		for( var i = 0; i < locations.length; i++ ){
			if (i < 2){
				addMarkerWithTimeout(locations[i], i * 200)
			}
			else{
				if (i == 2){ addCustomMarker(locations[i], i * 200, midpointImage) }
				else {addCustomMarker (locations[i], i * 200, placesImage)}
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
		function addCustomMarker(position, timeout, image) {
			setTimeout(function(){
				markers.push(new google.maps.Marker({
					position: position,
					map: self.map,
					animation: google.maps.Animation.DROP,
					icon: image
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
