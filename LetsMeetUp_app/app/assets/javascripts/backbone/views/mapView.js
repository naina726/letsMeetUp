App.Views.MapView = Backbone.View.extend({
	el: 'map',
	initialize: function() {
		console.log("NEW Map VIEW CREATED");
		this.markers = [];
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
			zoom: 13,
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
		var midpointImage = '/midpoint.png';
		var self = this;
		this.markers = [];
		this.locations = [
			{lat: this.lat1, lng: this.long1},
			{lat: this.lat2, lng: this.long2},
			{lat: this.avgLat, lng: this.avgLong},
		];

	 	function addMarkerWithTimeout (position, timeout) {
			setTimeout(function(){
				self.markers.push(new google.maps.Marker({
					position: position,
					map: self.map,
					animation: google.maps.Animation.DROP
				}));
			}, timeout);
		};

		addMarkerWithTimeout(this.locations[0], 400);
		addMarkerWithTimeout(this.locations[1], 600);

		setTimeout(function(){
			self.markers.push(new google.maps.Marker({
				position: self.locations[2],
				map: self.map,
				animation: google.maps.Animation.DROP,
				icon: midpointImage
			}));
		}, 800);

		setTimeout(function(){
			App.collection.each(self.renderYelpPins, self)
		}, 1400);

		//this.reZoom();
	},

	renderYelpPins : function(model){
		var loc = {
			lat: model.attributes.hash.location.coordinate.latitude,
			lng: model.attributes.hash.location.coordinate.longitude
		}

		var placesImage = '/places.png';
		var self = this;

		var newMarker = new google.maps.Marker({
			position: loc,
			map: self.map,
			animation: google.maps.Animation.DROP,
			icon: placesImage
		});

		//NEWINFOBOX IS RENDERED HTML FROM HBS TEMPLATE
		//THIS IS MODEL SPECIFIC
  		var newInfoBox = new App.Views.InfoView({model: model});
  		var contentString = newInfoBox.render()


  		//SETS INFOWINDOW TO GOOGLE MAPS BOX
		var infowindow = new google.maps.InfoWindow({
    		content: contentString,
    		maxWidth: 200
  		});

		//ISOLATE ASSOCIATED DIV
		var associatedDiv = $("#listResults").find('[data-id="' + model.attributes.hash.id + '"]');

		//ONCLICK FOR MARKER
		newMarker.addListener('click', function() {
    		infowindow.open(this.map, newMarker);
    		associatedDiv.css("border","2px solid yellow");

  		});

		this.markers.push(newMarker)
	},

	reZoom: function(){
		console.log("REZOOM");
		console.log(this.markers)
		var self = this;
		var bounds = new google.maps.LatLngBounds();
		for(var k=0; k < self.markers.length; k++) {
			console.log(self.markers[k])
 			bounds.extend(self.markers[k].getPosition());
		};
		this.map.setCenter(bounds.getCenter());
		this.map.fitBounds(bounds);
		this.map.setZoom((this.map.getZoom())-1); 
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
