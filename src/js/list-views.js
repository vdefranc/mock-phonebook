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
		this.listenTo(this.model, 'pick', this.pickName);
		this.listenTo(this.collection, 'add edited searched', this.removeView);

		if (this.model.cid == currentModel) {
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
	pickName: function () {
		currentModel = this.model.cid;
		$('.picked').removeClass('picked');
		this.$el.addClass('picked');
		this.collection.trigger('pickName');
	},
	removeView: function () {
		this.remove();
		this.stopListening();
	}
});