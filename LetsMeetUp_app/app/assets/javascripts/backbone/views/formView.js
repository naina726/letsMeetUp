App.Views.FormView = Backbone.View.extend({
    el: '#form',


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
        var self = this;
        
        var geocoder1 = new google.maps.Geocoder();
        geocoder1.geocode( { 'address': add1}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                    debugger;
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

        //THIS IS A JANKY DUCT TAPE FIX BUT IT SOLVES THE
        //ASYNCH PROBLEM/IS MINIMAL
        setTimeout(function(){self.internalSearch()}, 300);
    },
    internalSearch: function(){
        //ajax post to search route in controller
        debugger;
        console.log("HELLLLOOOOOOOOOOO INTERNAL SEARCH  " + this.lat1 + "  ugh")
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

