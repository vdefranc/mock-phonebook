var ContactCollection = Backbone.Collection.extend({
	model: Contact,
	initialize: function () {
		this.reset(data);
		var self = this;

		this.on('pickName', this.changeViewportModel, this);
		this.on('addContact', this.addContact, this);

		new SearchView({collection: self});
		new ContactListView({collection: self});
		viewport = new ContactViewportView({
			collection: self,
			model: this.at(currentModel)
		});
	},
	addContact: function () {

	},
	changeViewportModel: function () {
		viewport.trigger('changeViewportModel');
	}
});