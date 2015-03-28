App.Contact = Backbone.Model.extend({
	first: 'New',
	last: 'Contact',
	phone: 'Enter Number',
	email: 'Enter Email',
	initialize: function () {
		this.on('destroy', this.onDestroy, this);
	},
	onDestroy: function () {
		deletedIndex = this.collection.indexOf(this);
	}
});