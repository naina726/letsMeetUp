App.Views.ListView = Backbone.View.extend({
	el: '#listResults',
	initialize: function  () {
		console.log("list view created");
		this.renderAll()
	},
	renderAll: function  () {
		this.collection.each(this.renderOne, this)
	}, 
	renderOne: function  (model) {
		var newView = new App.Views.SingleListView({model: model});
		this.$el.append(newView.el)
	}
});
