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
	initialize: function () {
		this.listenTo(this.collection, 'pickName', this.changeModel, this);
		this.listenTo(this.collection, 'addContact', this.newModel, this);
		this.listenTo(this.collection, 'edit', this.edit, this);

		this.render();
	},
	render: function () {
		var info = this.template({
			first: this.model.get('first'),
			last: this.model.get('last'),
			phone: this.model.get('phone')
		});

		this.$el.html(info);

		// enables masking plugin for pone input field.
		this.$el.find('input[name="phone"]').mask('(000) 000-0000');
	},
	// re-renders on model change
	changeModel: function () {
		this.model = this.collection.get({cid: currentModel});
		this.render();
	},
	// initiates and completes contact editing
	edit: function () {
		var editButton = $('.button-edit').find('span'),
			inputs = $('.info-input'),
			vals = [];

		//begin edit
		if (!editing) {
			editing = true;
			inputs.attr("readonly", false)
				.addClass('active-edit');
			editButton.addClass('glyphicon-floppy-save');

		//process edit request
		} else {
			// gets input values
			inputs.each(function(i){
				vals.push($(this).val());
			});

			// procedes if values are valid
			if(!this.validate(vals)) {
				return false;
			}

			// sets model vals
			this.model.set({
				first: vals[0],
				last: vals[1],
				phone: vals[2]
			});

			// resets edit/save button to edit mode
			editButton.removeClass('glyphicon-floppy-save');

			// adds model to collection if appropriate
			if (creatingContact) {
				console.log('create contact');
				this.collection.add(this.model);
				creatingContact = false;
			}

			//wrap up
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
	},
	validate: function (vals) {
		// stores regex tests
		var phoneDigits = vals[2].split(/[-()\s]/gi).join(''),
				first = /^[a-zA-Z]+$/.test(vals[0]),
				last = /^[a-zA-Z]+$/.test(vals[1]),
				phone = /^\d{10}$/.test(phoneDigits),
				testArray = [first, last, phone],
				allPass = first && last && phone;

		if (allPass) {
			return true;
		} else {
			var iterator = 0;
			testArray.forEach(function (i) {
				// if invalid, shows invalid message and changes border to red
				if (!i) {
					$($('.info-input')[iterator]).css('border', '1px solid red');
					$($('.validationMessage')[iterator]).show();
					console.log($('.validationMessage')[iterator]);
				}
				iterator++;
			});
		}
	}
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
	// changes name header 
	subRender: function () {
		var text = this.model.get('first') ? this.model.get('first') + ' ' + this.model.get('last') : 'New Contact';
			
		this.$el.find('h3').html(text);
	},
	showList: function () {
		this.collection.trigger('showList');
	}
});