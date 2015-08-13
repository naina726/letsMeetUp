App.Views.FormView = Backbone.View.extend({
    el: '#form',
    lat1: "",
    long1: "",
    lat2: "",
    long2: "",

    initialize: function(){
        console.log("RENDERING FORM VIEWZ");
        this.template = HandlebarsTemplates["form"];
        console.log(this.template)
        this.render();
    },
    render: function() {
        this.$el.html(this.template());
    },
    events: {
        'click button': 'convert'
    },
    convert: function(){
        var add1 = $('#addressOne').val();
        var add2 = $('#addressTwo').val();
        this.activity = $("#searchActivity").val();

        var geocoder1 = new google.maps.Geocoder();
        geocoder1.geocode( { 'address': add1}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                   this.lat1 = results[0].geometry.location.lat();
                   this.long1 = results[0].geometry.location.lng();
             } 
        });
        var geocoder2 = new google.maps.Geocoder();
        geocoder2.geocode( { 'address': add2}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                   this.lat2 = results[0].geometry.location.lat();
                   this.long2 = results[0].geometry.location.lng();
             } 
        });

        setTimeout(function(){ 
        	console.log(this.lat1 + "     " + this.long1);
			console.log("SECOND THING " + this.lat2 + "     " + this.long2);
         }, 1000);
        setTimeout(this.internalSearch(), 1100);
    },
    internalSearch: function(){
        //ajax post to search route in controller
        console.log("HELLLLOOOOOOOOOOO INTERNAL SEARCH")
        console.log(this.lat1)
        $.ajax({
            type: "POST",
            url: 'yelps/search',
            data: {
                lat1: this.lat1,
                long1: this.long1,
                lat2: this.lat2,
                long2: this.long2,
                activity: this.activity
            }
        }).done(function(results){
            App.mapView = new App.Views.MapView();
            App.mapView.generateMarkers(data, results);
            //ALSO INITIALIZE LISTVIEW
        })
    }
})

