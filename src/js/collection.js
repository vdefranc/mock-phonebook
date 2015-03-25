var currentCollection = 0;

var ContactCollection = Backbone.Collection.extend({
	model: Contact,
	initialize: function () {
		this.reset(data);
		var self = this;
		
		new ContactView({model: self.at(currentCollection)});
	}
});