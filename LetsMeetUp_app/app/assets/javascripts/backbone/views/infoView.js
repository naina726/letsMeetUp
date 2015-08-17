App.Views.InfoView = Backbone.View.extend({
	initialize: function(model) {
		console.log("NEW LIST VIEW CREATED");
		this.template = HandlebarsTemplates['infoBox'];
	},
	render: function() {
		return this.template(this.model.toJSON().hash);	
	}
})