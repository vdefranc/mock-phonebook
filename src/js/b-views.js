var SearchView = Backbone.View.extend({
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
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template);
	},
	events: {
		'click button': 'addContact',
		"keyup .searching" : "searchList",
	},
	addContact: function () {
		if(!editing) {
			this.collection.trigger('addContact');
		}
	},
	searchList: function (e) {
		this.collection.trigger('searched');
	}
});

var ContactListView = Backbone.View.extend({
	id: 'contact-list',
	$container: $('#contact-list-column'),
	initialize: function (){
		this.render();
		var self = this;

		this.listenTo(this.collection, 'add', this.populate);
		this.listenTo(this.collection, 'searched edited', this.populate);

		this.populate();
	},
	render: function () {
		this.$container.append(this.$el);
	},
	populate: function () {
		var self = this;

		this.collection.search($('.searching').val()).forEach(function (i) {
			new ContactListingView({
				model: i,
				collection: self.collection
			});
		});
	}
});

var ContactListingView = Backbone.View.extend({
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
		//this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.removeView);
		this.listenTo(this.collection, 'add edited searched', this.removeView);
		this.listenTo(this.model, 'pick', this.pickName);

		if (this.model.cid == currentModel) {
			this.$el.addClass('picked');
		}
	},
	render: function () {
		var questionHtml = this.template({
			name: this.model.get('last') + ', ' + this.model.get('first')
		});

		this.$el.html(questionHtml);
		this.$container.append(this.$el);
	},
	listDelete: function (e) {
		this.model.destroy();
	},
	removeView: function () {
		this.remove();
		this.stopListening();
	},
	pickName: function () {
		currentModel = this.model.cid;
		$('.contact-listing').removeClass('picked');
		this.$el.addClass('picked');
		this.collection.trigger('pickName');
	}
});

var ContactViewportChildView = Backbone.View.extend({
	template: _.template('\
		<form>\
			<p>First Name:<input name="first" type="text" value="<%= first %>" readonly></p>\
			<p>Last Name:<input name="last" type="text" value="<%= last %>"" readonly></p>\
			<p>Phone Number:<input name="phone" type="text" value="<%= phone %>"" readonly></p>\
		</form>\
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
		var modelData = {
			first: this.model.get('first'),
			last: this.model.get('last'),
			phone: this.model.get('phone')
		};

		var questionHtml = this.template({
			first: this.model.get('first'),
			last: this.model.get('last'),
			phone: this.model.get('phone')
		});

		this.$el.html(questionHtml);
	},
	changeModel: function () {
		this.model = this.collection.get({cid: currentModel});
		this.render();
	},
	newModel: function () {
		this.model = currentModel;
		this.render();
		this.edit();
	},
	edit: function () {
		var editButton = $('.edit').find('span');

		if (!editing) {
			editing = true;
			this.$el.find('input').attr("readonly", false)
				.addClass('active-edit');

			
			editButton.removeClass('glyphicon-edit').addClass('glyphicon-floppy-save');
		} else {
			this.$el.find('input').attr("readonly", true)
			.removeClass('active-edit');

			var inputs = this.$el.find('input');
			var vals = [];

			inputs.each(function(i){
				vals.push($(this).val());
			});

			this.model.set({
				first: vals[0],
				last: vals[1],
				phone: vals[2]
			});


			editButton.removeClass('glyphicon-floppy-save').addClass('glyphicon-edit');

			if (creatingContact) {
				this.collection.add(this.model);
				creatingContact = false;
			}

			this.render();
			currentModel = this.model.cid;
			this.collection.trigger('edited');
			editing = false;
		}
	},
});

var ContactViewportView = Backbone.View.extend({
	model: Contact,
	className: 'contact-info row',
	$container: $('#contact-view'),
	template: _.template(' \
            <div class="col-sm-12">\
                <h3><%= first %> <%= last %></h3>\
                 <div class="contact-view-button-wrapper">\
                    <button class="btn btn-default edit" type="button">\
                        <span class="glyphicon glyphicon-edit"></span>\
                    </button>\
                    <button class="btn btn-default delete" type="button">\
                        <span class="glyphicon glyphicon-trash"></span>\
                    </button>\
                </div>\
                <div class="contact-fields">\
                </div>\
            </div>\
	'),
	events: {
		'click .edit': 'edit',
		'click .delete': 'delete'
	},
	initialize: function () {
		var self = this;

		//this.listenTo(this.model, 'destroy', this.newModel);
		this.listenTo(this.collection, 'pickName', this.changeModel);
		this.listenTo(this.collection, 'addContact', this.newModel);
		this.listenTo(this.collection, 'add change', this.subRender);
		this.render();

		new ContactViewportChildView({
			model: self.model,
			collection: self.collection,
			el: '.contact-fields',
		});
	},
	render: function (){
		var modelData = {
			first: this.model.get('first'),
			last: this.model.get('last')
		};

		var questionHtml = this.template({
			first: this.model.get('first'),
			last: this.model.get('last')
		});

		this.$el.html(questionHtml);
		this.$container.append(this.$el);
	},
	edit: function () {
		this.collection.trigger('edit');
	},
	delete: function () {
		if(!editing) {
			this.model.destroy();
		}
	},
	newModel: function () {
		this.model = currentModel;
		creatingContact = true;
		this.subRender();
	},
	changeModel: function () {
		this.model = this.collection.get({cid: currentModel});
		this.subRender();
	},
	subRender: function () {
			var text = this.model.get('first') + ' ' + this.model.get('last');

			this.$el.find('h3').html(text);
	}
});
