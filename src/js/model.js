App.Contact = Backbone.Model.extend({
	initialize: function () {
		this.on('destroy', this.onDestroy, this);
	},
	onDestroy: function () {
		deletedIndex = this.collection.indexOf(this);
	}
});