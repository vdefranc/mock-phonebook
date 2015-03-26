var currentModel = 0;
var viewport;
var ContactCollection = Backbone.Collection.extend({
	model: Contact,
	initialize: function () {
		this.reset(data);
		var self = this;

		this.on('pickName', this.changeViewportModel, this);
		

		new ContactListView({collection: self});
		viewport = new ContactViewportView({
			collection: self,
			model: this.at(currentModel)
		});
	},
	changeViewportModel: function () {
		viewport.trigger('logsomething');
	}
});