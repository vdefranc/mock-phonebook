(function( window ) {
  'use strict';

var Contact = Backbone.Model.extend({
	first: 'Enter Name...',
	last: 'Enter Name...',
	phone: 'Enter Number',
	email: 'Enter Email',
	initialize: function (){
		var self = this;
		new ContactView({model: self});
	},
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
var ContactView = Backbone.View.extend({
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
		//this.$el.css('background', "#F7F7F7 url('http://www.chronicle.com/img/photos/biz/texture_diagonal_gray.gif') repeat");
	}
});

$(document).ready(function () {
	var app = new ContactCollection();
});
var ContactCollection = Backbone.Collection.extend({
	model: Contact,
	initialize: function () {
		this.reset(data);
		console.log(this)
	}
});
}( this ));
