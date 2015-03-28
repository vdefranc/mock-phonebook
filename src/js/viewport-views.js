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
		<p class="validationMessage">Please enter a valid phone number.</p> \
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
			var phoneDigits = vals[2].split('-').join('');
			var first = /^[a-zA-Z]+$/.test(vals[0]),
				last = /^[a-zA-Z]+$/.test(vals[1]),
				phone = /^\d+$/.test(phoneDigits),
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