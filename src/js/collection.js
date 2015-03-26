var currentModel= 0;

var ContactCollection = Backbone.Collection.extend({
	model: Contact,
	initialize: function () {
		this.reset(data);
		var self = this;
		

		new ContactListView({collection: self});
		new ContactViewportView({
			collection: self,
			model: this.at(currentModel)
		});
	}
});