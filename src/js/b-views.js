var ContactListingView = Backbone.View.extend({
	className: 'contact-listing row',
	$container: $('#contact-list'),
	template: _.template(' \
            <div class="col-xs-10 listing-name"><p><%= name %></p></div> \
            <div class="edit-contact-name col-xs-2 glyphicon glyphicon-trash"></div>'),
	initialize: function (){
		this.render();
	},
	render: function () {
		var questionHtml = this.template({
			name: this.model.get('first') + ' ' + this.model.get('last')
		});

		this.$el.html(questionHtml);
		this.$container.append(this.$el);
	}
});

var ContactView = Backbone.View.extend({
	className: 'contact-info row',
	$container: $('#contact-view'),
	template: _.template(' \
            <div class="col-sm-12">\
                <h3>New Contact</h3>\
                 <div class="contact-view-button-wrapper">\
                    <button class="btn btn-default edit" type="button">\
                        <span class="glyphicon glyphicon-edit"></span>\
                    </button>\
                    <button class="btn btn-default delete" type="button">\
                        <span class="glyphicon glyphicon-trash"></span>\
                    </button>\
                </div>\
                <div class="contact-fields">\
                    <form>\
                    <p>First Name:<input name="first" type="text" value="<%= first %>" readonly></p>\
                    <p>Last Name:<input name="last" type="text" value="<%= last %>"" readonly></p>\
                    <p>Phone Number:<input name="phone" type="text" value="<%= phone %>"" readonly></p>\
                </form>\
                </div>\
            </div>\
	'),
	events: {
		'click .edit': 'edit',
	},
	initialize: function () {
		this.render();
	},
	render: function (){
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
		this.$container.append(this.$el);
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

			editButton.removeClass('glyphicon-floppy-save').addClass('glyphicon-edit');

			editing = false;
		}
		
	}
});
