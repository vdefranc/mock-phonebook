var phonebook = window.phonebook || (function () {

var App = {},
	deletedIndex,
	viewport,
	whichShowing,
	isMobile = true,
	creatingContact = false,
	currentModel = 'c01',
	editing = false,
	indexAfterDelete = 0,
	initialData = [
		{
			first: 'Adam',
			last: 'Johnson',
			phone: '111-111-1111'
		},
		{
			first: 'Vinny',
			last: 'DeFrancesco',
			phone: '111-111-1111'
		},
		{
			first: 'Corey',
			last: 'Tucker',
			phone: '111-111-1111'
		},
		{
			first: 'Emma',
			last: 'Lydon',
			phone: '111-111-1111'
		},
		{
			first: 'Kate',
			last: 'Lowe',
			phone: '111-111-1111'
		},
		{
			first: 'Jess',
			last: 'Guerra',
			phone: '111-111-1111'
		},
		{
			first: 'Zach',
			last: 'Oliphant',
			phone: '111-111-1111'
		},
		{
			first: 'Larry',
			last: 'Oliphant',
			phone: '111-111-1111'
		},
		{
			first: 'Lee',
			last: 'DeFrancesco',
			phone: '111-111-1111'
		},
		{
			first: 'Barry',
			last: 'Lydon',
			phone: '111-111-1111'
		},
		{
			first: 'Derek',
			last: 'Jeter',
			phone: '111-111-1111'
		},
		{
			first: 'Marshawn',
			last: 'Lynch',
			phone: '111-111-1111'
		},
		{
			first: 'Barack',
			last: 'Obama',
			phone: '111-111-1111'
		},
		{
			first: 'Mitt',
			last: 'Romney',
			phone: '111-111-1111'
		},
		{
			first: 'Michelle',
			last: 'Obama',
			phone: '111-111-1111'
		},
		{
			first: 'Ann',
			last: 'Romney',
			phone: '111-111-1111'
		},
		{
			first: 'Abriella',
			last: 'Milazzo',
			phone: '111-111-1111'
		},
		{
			first: 'Ryan',
			last: 'Smith',
			phone: '111-111-1111'
		}
	];

function findIndexAfterDelete (collection) {
	var currentContact;

	if (!collection.at(deletedIndex)) {

		if (deletedIndex === 0) {
			collection.trigger('addContact');
			currentContact = 0;
		} else {
			currentContact = deletedIndex - 1;
		}

	} else {
		currentContact = deletedIndex;
	}

	currentModel = collection.at(currentContact);
}

function checkScreenSize (collection) {
	if($(window).width() <= 525 ) {
		isMobile = true;
		$('.picked').removeClass('picked')
		$('.glyphicon-menu-left').closest('button').show();

		if($('#contact-view').is(':visible')){
			$('#contact-view').css({
				'display': 'block',
				'left': '100%'
			});
		}

	} else {
		isMobile = false;
		if(!$('#contact-list-column').is(':visible')){
			$('#contact-list-column').css({
				'display': 'block',
				'left': '0%'
			});
		}
		if(!$('#contact-view').is(':visible')){
			$('#contact-view').css({
				'display': 'block',
				'left': '0%'
			});
		}
		collection.get({cid: currentModel}).trigger('notMobile');
		$('.glyphicon-menu-left').closest('button').hide();
	}
}
App.Contact = Backbone.Model.extend({
	initialize: function () {
		this.on('destroy', this.onDestroy, this);
	},
	onDestroy: function () {
		deletedIndex = this.collection.indexOf(this);
	}
});
App.SearchView = Backbone.View.extend({
	el: '.top-bar',
	template: ' \
		<div class="col-xs-10">\
            <div class="search-group has-feedback">\
                <i class="glyphicon glyphicon-search form-control-feedback"></i>\
                <input type="search" class="form-control searching" placeholder="Search..."></input>\
            </div>\
        </div>\
        <button class="btn btn-default" type="button">\
            <span class="glyphicon glyphicon-plus"></span>\
        </button>\
		',
	events: {
		'click button': 'addContact',
		"keyup .searching" : "searchList",
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template);
	},
	addContact: function () {
		if(!editing) {
			this.collection.trigger('addContact');
			
			if(isMobile) {
				this.collection.trigger('showViewport');
			}
		}
	},
	searchList: function (e) {
		this.collection.trigger('searched');
	}
});
App.ListView = Backbone.View.extend({
	id: 'contact-list',
	$container: $('#contact-list-column'),
	initialize: function (){
		var self = this;

		this.listenTo(this.collection, 'add searched edited', this.populate);

		this.render();
	},
	render: function () {
		this.$container.append(this.$el);
		this.populate();
	},
	populate: function () {
		var self = this;

		this.collection.search($('.searching').val()).forEach(function (i) {
			new App.ListingView({
				model: i,
				collection: self.collection
			});
		});
	}
});

App.ListingView = Backbone.View.extend({
	className: 'contact-listing row',
	$container: $('#contact-list'),
	template: _.template(' \
            <div class="col-xs-10 listing-name"><p><%= name %></p></div> \
            <div class="delete-contact col-xs-2 glyphicon glyphicon-trash"></div>'),
	events: {
		'click .delete-contact': 'listDelete',
		'click .listing-name': 'pickName'
	},
	initialize: function (){
		this.render();
		this.listenTo(this.model, 'destroy', this.removeView);
		this.listenTo(this.model, 'notMobile', this.notMobile);
		this.listenTo(this.model, 'pick', this.pickName);
		this.listenTo(this.collection, 'add edited searched', this.removeView);

		if (this.model.cid === currentModel && !isMobile) {
			this.$el.addClass('picked');
		}
	},
	render: function () {
		var info = this.template({
			name: this.model.get('last') + ', ' + this.model.get('first')
		});

		this.$el.html(info);
		this.$container.append(this.$el);
	},
	listDelete: function (e) {
		this.model.destroy();
	},
	notMobile: function () {
		this.$el.addClass('picked');;
	},
	pickName: function () {
		currentModel = this.model.cid;

		if(!isMobile) {
			$('.picked').removeClass('picked');
			this.$el.addClass('picked');
		} else {
			this.collection.trigger('showViewport');
		}

		this.collection.trigger('pickName');
	},
	removeView: function () {
		this.remove();
		this.stopListening();
	}
});
App.ViewportInfoView = Backbone.View.extend({
	template: _.template('\
		<form>\
			<p>First Name:<input class="info-input" name="first" type="text" value="<%= first %>" readonly></p>\
			<p>Last Name:<input class="info-input" name="last" type="text" value="<%= last %>"" readonly></p>\
			<p>Phone Number:<input class="info-input" name="phone" type="text" value="<%= phone %>"" readonly></p>\
		</form>\
		<div id="validationContainer"> \
		<p class="validationMessage">Please enter a valid first name.</p> \
		<p class="validationMessage">Please enter a valid last name.</p> \
		<p class="validationMessage">Please enter a valid 10-digit phone number.</p> \
		</div> \
	'),
	events: {
	},
	initialize: function () {
		this.render();

		this.listenTo(this.collection, 'pickName', this.changeModel, this);
		this.listenTo(this.collection, 'addContact', this.newModel, this);
		this.listenTo(this.collection, 'edit', this.edit, this);
	},
	render: function () {
		var info = this.template({
			first: this.model.get('first'),
			last: this.model.get('last'),
			phone: this.model.get('phone')
		});

		this.$el.html(info);
		this.$el.find('input[name="phone"]').mask('(000) 000-0000');
	},
	changeModel: function () {
		this.model = this.collection.get({cid: currentModel});
		this.render();
	},
	edit: function () {
		var editButton = $('.button-edit').find('span'),
			inputs = $('.info-input'),
			vals = [];

		if (!editing) {
			initiateEdit();
		} else {
			inputs.each(function(i){
				vals.push($(this).val());
			});

			if(!validate(vals)) {
				return false;
			}

			this.model.set({
				first: vals[0],
				last: vals[1],
				phone: vals[2]
			});
$('.phone').text(function(i, text) {
    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
});
			editButton.removeClass('glyphicon-floppy-save');

			if (creatingContact) {
				console.log('create contact');
				this.collection.add(this.model);
				creatingContact = false;
			}

			this.render();
			currentModel = this.model.cid;
			this.collection.trigger('edited');
			editing = false;

		}

		function initiateEdit () {
			editing = true;
			inputs.attr("readonly", false)
				.addClass('active-edit');
			
			editButton.addClass('glyphicon-floppy-save');
		}

		function validate (vals) {
			var phoneDigits = vals[2].split(/[-()\s]/gi).join('');
			var first = /^[a-zA-Z]+$/.test(vals[0]),
				last = /^[a-zA-Z]+$/.test(vals[1]),
				phone = /^\d{10}$/.test(phoneDigits),
				testArray = [first, last, phone],
				allPass = first && last && phone;

			if (allPass) {
				return true;
			} else {
				var iterator = 0;
				testArray.forEach(function (i) {
					if (!i) {
						$($('.info-input')[iterator]).css('border', '1px solid red');
						$($('.validationMessage')[iterator]).show();
						console.log($('.validationMessage')[iterator]);
					}
					iterator++;
				});
			}
		}

	},
	newModel: function () {
		this.model = currentModel;
		this.render();
		this.edit();
	}
});

App.ValidationView = Backbone.View.extend({

});

App.ViewportView = Backbone.View.extend({
	model: App.Contact,
	className: 'contact-info row',
	$container: $('#contact-view'),
	template: _.template(' \
            <div class="col-sm-12">\
                 <div class="contact-view-button-wrapper">\
	                <button class="btn btn-default button-back" type="button">\
	                        <span class="glyphicon glyphicon-menu-left"></span>\
		            </button>\
                    <button class="btn btn-default button-edit" type="button">\
                        <span class="glyphicon glyphicon-pencil"></span>\
                    </button>\
                    <button class="btn btn-default button-delete" type="button">\
                        <span class="glyphicon glyphicon-trash"></span>\
                    </button>\
                </div>\
                <h3><%= first %> <%= last %></h3>\
                <div class="contact-fields">\
                </div>\
            </div>\
	'),
	events: {
		'click .button-edit': 'edit',
		'click .button-delete': 'delete',
		'click .button-back': 'showList'
	},
	initialize: function () {
		var self = this;

		this.listenTo(this.collection, 'pickName', this.changeModel);
		this.listenTo(this.collection, 'addContact', this.newModel);
		this.listenTo(this.collection, 'add change', this.subRender);
		this.render();

		new App.ViewportInfoView({
			model: self.model,
			collection: self.collection,
			el: '.contact-fields',
		});
	},
	render: function (){
		var info = this.template({
			first: this.model.get('first'),
			last: this.model.get('last')
		});

		this.$el.html(info);
		this.$container.append(this.$el);
	},
	changeModel: function () {
		this.model = this.collection.get({cid: currentModel});
		this.subRender();
	},
	delete: function () {
		if(!editing) {
			this.model.destroy();
		}
	},
	edit: function () {
		this.collection.trigger('edit');
	},
	newModel: function () {
		this.model = currentModel;
		creatingContact = true;
		this.subRender();
	},
	subRender: function () {
		var text = this.model.get('first') ? this.model.get('first') + ' ' + this.model.get('last') : 'New Contact';
			
		this.$el.find('h3').html(text);
	},
	showList: function () {
		this.collection.trigger('showList');
	}
});
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
		if(!isMobile) {
			this.get(currentModel).trigger('pick');
		}
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

		whichShowing = 'viewport';
	},
	showList: function () {
		$('#contact-view').animate({left: "100%"}, 500, function (){
			$(this).hide();
		});
		$('#contact-list-column').show();
		$('#contact-list-column').animate({left: "0"}, 500);
		$('.top-bar').css('width', '100%');

		whichShowing = 'list';
	}
});
$(document).ready(function () {
	function resizeSearchBar () {
		$('.top-bar').innerWidth($('.top-bar').parent().innerWidth());
	}

	var collection = new App.List();
	resizeSearchBar();
	checkScreenSize(collection);
	
	$(window).resize(function() {
		checkScreenSize(collection);
		resizeSearchBar();
	});

});

return App;

})();