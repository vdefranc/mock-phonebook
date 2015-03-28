var phonebook = window.phonebook || (function () {

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
		first: 'Kate',
		last: 'Lowe',
		phone: '111-111-1111'
	},
	{
		first: 'Jess',
		last: 'Guerra',
		phone: '111-111-1111'
	},
	{
		first: 'Zach',
		last: 'Oliphant',
		phone: '111-111-1111'
	},
	{
		first: 'Larry',
		last: 'Oliphant',
		phone: '111-111-1111'
	},
	{
		first: 'Lee',
		last: 'DeFrancesco',
		phone: '111-111-1111'
	},
	{
		first: 'Barry',
		last: 'Lydon',
		phone: '111-111-1111'
	},
	{
		first: 'Derek',
		last: 'Jeter',
		phone: '111-111-1111'
	},
	{
		first: 'Marshawn',
		last: 'Lynch',
		phone: '111-111-1111'
	},
	{
		first: 'Barack',
		last: 'Obama',
		phone: '111-111-1111'
	},
	{
		first: 'Mitt',
		last: 'Romney',
		phone: '111-111-1111'
	},
	{
		first: 'Michelle',
		last: 'Obama',
		phone: '111-111-1111'
	},
	{
		first: 'Ann',
		last: 'Romney',
		phone: '111-111-1111'
	},
	{
		first: 'Abriella',
		last: 'Milazzo',
		phone: '111-111-1111'
	},
	{
		first: 'Ryan',
		last: 'Smith',
		phone: '111-111-1111'
	}
];

var editing = false;

var currentModel = 'c01';
var viewport;
var creatingContact = false;
var deletedIndex;
var indexAfterDelete = 0;
var findIndexAfterDelete = function (collection) {
		if (!collection.at(deletedIndex)) {
			if(deletedIndex === 0) {
				collection.trigger('addContact');
				console.log('ahh');
				currentContact = 0;
			} else {
				currentContact = deletedIndex - 1;
			}
		} else {
			currentContact = deletedIndex;
		}

		currentModel = collection.at(currentContact);
};

var App = {};

