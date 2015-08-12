App.Views.FormView = Backbone.View.extend({
	el: '#form',
	initialize: function(){
		console.log("RENDERING FORM VIEWZ");
		this.template = HandlebarsTemplate["form"];
		console.log(this.template)
		var compiled_html = this.template();
		console.log(compiled_html);


		$(el).append( compiled_html)
	},



	events: {
		'click button': 'getInfoFromForm'
	},
	getInfoFromForm: function(){
		var add1 = $('#addressOne').val();
		var add2 = $('#addressTwo').val();
		var activity = $("#searchActivity").val();

        var geocoder1 = new google.maps.Geocoder();
        geocoder1.geocode( { 'address': add1}, function(results, status) {
        	if (status == google.maps.GeocoderStatus.OK) {
           		var lat1 = results[0].geometry.location.lat();
           		var long1 = results[0].geometry.location.lng();
         	} 
		});
        var geocoder2 = new google.maps.Geocoder();
        geocoder2.geocode( { 'address': add2}, function(results, status) {
        	if (status == google.maps.GeocoderStatus.OK) {
           		var lat2 = results[0].geometry.location.lat();
           		var long2 = results[0].geometry.location.lng();
         	} 
		});

	}
})

