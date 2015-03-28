App.ContactListView = Backbone.View.extend({
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
			new App.ContactListingView({
				model: i,
				collection: self.collection
			});
		});
	}
});

App.ContactListingView = Backbone.View.extend({
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