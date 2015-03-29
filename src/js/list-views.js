App.ListView = Backbone.View.extend({
	id: 'contact-list',
	$container: $('#contact-list-column'),
	initialize: function (){
		this.listenTo(this.collection, 'add searched edited', this.populate);
		this.render();
	},
	render: function () {
		this.$container.append(this.$el);
		this.populate();
	},
	populate: function () {
		var self = this;
		// creates new views based on search returns. Includes all if search is ''
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
		this.listenTo(this.model, 'destroy', this.removeView);
		this.listenTo(this.model, 'notMobile', this.notMobile);
		this.listenTo(this.model, 'pick', this.pickName);
		this.listenTo(this.collection, 'add edited searched', this.removeView);
		this.render();
	},
	render: function () {
		var info = this.template({
			name: this.model.get('last') + ', ' + this.model.get('first')
		});

		this.$el.html(info);
		this.$container.append(this.$el);

		//re-adds highlight color when list re-renders on search
		if (this.model.cid === currentModel && !isMobile) {
			this.$el.addClass('picked');
		}
	},
	listDelete: function (e) {
		this.model.destroy();
	},
	notMobile: function () {
		this.$el.addClass('picked');
	},
	pickName: function () {
		currentModel = this.model.cid;

		// changes highlight after picking a contact, but only if not mobile-sized
		if(!isMobile) {
			$('.picked').removeClass('picked');
			this.$el.addClass('picked');
		} else {
			this.collection.trigger('showViewport');
		}

		this.collection.trigger('pickName');
	},
	// allows garbage collector to delete dom nodes
	removeView: function () {
		this.remove();
		this.stopListening();
	}
});