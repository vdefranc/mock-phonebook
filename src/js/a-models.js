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