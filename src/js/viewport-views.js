App.ViewportInfoView = Backbone.View.extend({
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
		var info = this.template({
			first: this.model.get('first'),
			last: this.model.get('last'),
			phone: this.model.get('phone')
		});

		this.$el.html(info);
	},
	changeModel: function () {
		this.model = this.collection.get({cid: currentModel});
		this.render();
	},
	edit: function () {
		var editButton = $('.edit').find('span');

		if (!editing) {
			editing = true;
			this.$el.find('input').attr("readonly", false)
				.addClass('active-edit');

			
			editButton.removeClass('glyphicon-edit').addClass('glyphicon-floppy-save');
		} else {
			var inputs = this.$el.find('input'),
				vals = [];

			this.$el.find('input').attr("readonly", true)
			.removeClass('active-edit');

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
	newModel: function () {
		this.model = currentModel;
		this.render();
		this.edit();
	}
});

App.ViewportView = Backbone.View.extend({
	model: App.Contact,
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
	}
});