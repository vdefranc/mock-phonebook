var phonebook = window.phonebook || (function () {

var currentContact = 0,
	editing = false;
var Contact = Backbone.Model.extend({
	first: 'New',
	last: 'Contact',
	phone: 'Enter Number',
	email: 'Enter Email',
	initialize: function (){
		//
	}
});

var data = [
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
	},{
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
];
var ContactListView = Backbone.View.extend({
	id: 'contact-list',
	$container: $('#contact-list-column'),
	initialize: function (){
		this.render();
		var self = this;

		//Instatiate listitem views
		this.collection.forEach(function (i) {
			new ContactListingView({
				model: i,
				collection: self.collection
			});
		});
	},
	render: function () {
		this.$container.append(this.$el);
	},
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
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.removeView);
	},
	render: function () {
		var questionHtml = this.template({
			name: this.model.get('last') + ', ' + this.model.get('first')
		});

		this.$el.html(questionHtml);
		this.$container.append(this.$el);
	},
	listDelete: function () {
		this.model.destroy();
	},
	removeView: function () {
		this.remove();
		this.stopListening();
	},
	pickName: function () {
		currentModel = this.model.cid;
		this.collection.trigger('pickName');
	}
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
		'click .delete': 'delete'
	},
	initialize: function () {
		this.listenTo(this.model, 'destroy', this.newModel);
		this.on('logsomething', this.changeModel);
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

			this.render();

			editButton.removeClass('glyphicon-floppy-save').addClass('glyphicon-edit');
			editing = false;
		}
	},
	delete: function () {
		this.model.destroy();

		this.model = new Contact();
		console.log(this.model);

		this.render();
	},
	newModel: function () {
		var newone = new Contact({first: 'lol', last: 'haha', phone: 123});
		this.model = newone;
		this.render();
	},
	changeModel: function () {
		this.model = this.collection.get({cid: currentModel});
		this.render();
	}
});

var currentModel = 0;
var viewport;
var ContactCollection = Backbone.Collection.extend({
	model: Contact,
	initialize: function () {
		this.reset(data);
		var self = this;

		this.on('pickName', this.changeViewportModel, this);
		

		new ContactListView({collection: self});
		viewport = new ContactViewportView({
			collection: self,
			model: this.at(currentModel)
		});
	},
	changeViewportModel: function () {
		viewport.trigger('logsomething');
	}
});
$(document).ready(function () {
	var app = new ContactCollection();
});

})();