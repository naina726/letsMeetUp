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
                   self.lat1 = results[0].geometry.location.lat();
                   self.long1 = results[0].geometry.location.lng();
             } 
        });
        var geocoder2 = new google.maps.Geocoder();
        geocoder2.geocode( { 'address': add2}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                   self.lat2 = results[0].geometry.location.lat();
                   self.long2 = results[0].geometry.location.lng();
             } 
        });

        //THIS IS A JANKY DUCT TAPE FIX BUT IT SOLVES THE
        //ASYNCH PROBLEM/IS MINIMAL
        setTimeout(function(){self.internalSearch()}, 500);
    },
    internalSearch: function(){
        //ajax post to search route in controller
        console.log("INTERNAL SEARCH  " + this.lat1 + " " + this.lat2);
        var data = {
        	lat1: this.lat1,
            long1: this.long1,
            lat2: this.lat2,
            long2: this.long2,
            activity: this.activity,
            radius: 400
        };
        $.ajax({
        	method: 'POST',
        	url:'/yelps/search', 
        	data: data
        	}).success(function(queryJSON) {
        			console.log(queryJSON);
                    //SECOND AJAX POST IF TOTAL RESULTS = 0
                    if (queryJSON.total < 5){
                        data.radius = 600;
                        $.ajax({
                            method: 'POST',
                            url:'/yelps/search', 
                            data: data
                        }).success(function(queryJSON){
                            //THIRD AJAX CALL
                            if (queryJSON.total < 5){
                                data.radius = 1200;
                                $.ajax({
                                    method: 'POST',
                                    url:'/yelps/search', 
                                    data: data
                                }).success(function(queryJSON){
                                    console.log(queryJSON)
                                }).fail(function(){ alert("NOOOOOOOO"); });
                            }
                            //END THIRD CALL
                        }).fail(function(){ alert("NOOOOOOOO"); })
                    }
                    //END SECOND POST
        	}).fail(function() { console.log('failure'); 
        });
    }

})

