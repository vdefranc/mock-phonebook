var ContactCollection = Backbone.Collection.extend({
	model: Contact,
	localStorage: new Backbone.LocalStorage("phonebook-store"),
	initialize: function () {

		// this.reset(data);
		// this.forEach(function  (i) {
		// 	i.save();
		// });
		this.fetch();

		var self = this;
		currentModel = this.at(0).cid;
		this.on('pickName', this.changeViewportModel, this);
		this.on('addContact', this.addContact, this);
		this.on('remove', this.findIndex, this);
		this.on('edited', this.sort, this);
		this.on('edited searched', this.pickContact, this);
		this.on('change', this.saveit);
		this.on('add', this.saveit);

		new SearchView({collection: self});
		new ContactListView({collection: self});
		viewport = new ContactViewportView({
			collection: self,
			model: this.at(0)
		});
	},
	saveit: function () {
		this.forEach(function  (i) {
			i.save();
		});
	},
	searchedList: this,
	search: function (query) {
		if (query == '') return this;
 
		var pattern = new RegExp(query, 'i');
		return this.filter(function(data) {
		  	return pattern.test(data.get("last") + ' ' + data.get("first"));
		} );
	},
	comparator: function(contact) {
		var name = contact.get("last") + contact.get("first");

		return name.toLowerCase();
	},
	addContact: function () {
		currentModel = new Contact({});

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