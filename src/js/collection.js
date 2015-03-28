App.List = Backbone.Collection.extend({
	model: App.Contact,
	localStorage: new Backbone.LocalStorage("phonebook-store"),
	comparator: function(contact) {
		var name = contact.get("last") + contact.get("first");

		return name.toLowerCase();
	},
	initialize: function () {
		var self = this;

		this.on('showList', this.showList, this);
		this.on('showViewport', this.showViewport, this);
		this.on('pickName', this.changeViewport, this);
		this.on('addContact', this.addContact, this);
		this.on('remove', this.findIndex, this);
		this.on('edited', this.sort, this);
		this.on('edited searched', this.pickContact, this);
		this.on('change add edited', this.saveIt);
		this.on('edited', this.saveIt);

		if(!localStorage.length){
			this.reset(initialData);
			this.forEach(function (i) {
				i.save();
			});
		} else {
			this.fetch();
		}

		currentModel = this.at(0).cid;

		new App.SearchView({collection: self});
		new App.ListView({collection: self});
		viewport = new App.ViewportView({
			collection: self,
			model: this.at(0)
		});
	},
	addContact: function () {
		if(!editing) {
			currentModel = new App.Contact({});
			$('.contact-listing').removeClass('picked');
		}
	},
	changeViewport: function () {
		viewport.trigger('changeViewportModel');
	},
	findIndex: function () {
		findIndexAfterDelete(this);
		if(this.length) {
			this.pickContact();
		}
	},
	pickContact: function () {
		// this.get(currentModel).trigger('pick');
	},
	saveIt: function () {
		this.forEach(function (i) {
			i.save();
		});
	},
	search: function (query) {
		if (query === '') {
			return this;
		}
 
		var pattern = new RegExp(query, 'i');
		return this.filter(function(contact) {
			return pattern.test(contact.get("last") + ' ' + contact.get("first"));
		});
	},
	showViewport: function () {
		$('#contact-list-column').animate({left: "-100%"}, 500, function (){
			$(this).hide();
		});
		$('#contact-view').show();
		$('#contact-view').animate({left: "0"}, 500);
	},
	showList: function () {
		$('#contact-view').animate({left: "100%"}, 500, function (){
			$(this).hide();
		});
		$('#contact-list-column').show();
		$('#contact-list-column').animate({left: "0"}, 500);
		$('.top-bar').css('width', '100%');
	}
});