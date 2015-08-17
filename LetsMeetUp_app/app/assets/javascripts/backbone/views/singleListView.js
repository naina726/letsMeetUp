App.Views.SingleListView = Backbone.View.extend({
	initialize: function() {
		console.log("NEW LIST VIEW CREATED");
		this.template = HandlebarsTemplates['listResults'];
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON().hash));




		
	}
})