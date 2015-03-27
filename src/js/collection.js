var ContactCollection = Backbone.Collection.extend({
	model: Contact,
	initialize: function () {
		this.reset(data);
		var self = this;

		this.on('pickName', this.changeViewportModel, this);
		this.on('addContact', this.addContact, this);
		this.on('remove', this.findIndex, this);
		this.on('edited', this.sort, this);
		this.on('edited', this.pickContact, this);

		new SearchView({collection: self});
		new ContactListView({collection: self});
		viewport = new ContactViewportView({
			collection: self,
			model: this.at(0)
		});
	},
	comparator: function(contact) {
		var name = contact.get("last") + contact.get("first");

		return name.toLowerCase();
	},
	addContact: function () {
		currentModel = new Contact({
			first: 'New',
			last: 'Contact',
			phone: 'Enter Number',
			email: 'Enter Email'
		});

		$('.contact-listing').removeClass('picked');

	},
	changeViewportModel: function () {
		viewport.trigger('changeViewportModel');
	},
	findIndex: function () {
		findIndexAfterDelete(this);
		if(this.length) {
			this.pickContact();
		}

	},
	pickContact: function () {
		console.log(currentModel);
		this.get(currentModel).trigger('pick');
	}
});