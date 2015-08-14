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
            self.avgLong = midpoint[1]
        }).fail(function(){
        	alert("something is wrong")
        })
       
        setTimeout(function(){self.generateMap()}, 200);

	},
	generateMap: function(){
		debugger;
		var mapCanvas = $('#map');
		var mapOptions = {
			center: new google.maps.LatLng(this.avgLat, this.avgLong),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(mapCanvas, mapOptions);
		//var transitLayer = new google.maps.TransitLayer();
  		//transitLayer.setMap(map);

	},
	generateMarkers: function() {
		console.log("MAPVIEW GENERATE MARKERS YAY");
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
