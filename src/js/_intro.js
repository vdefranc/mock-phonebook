var phonebook = window.phonebook || (function () {

var App = {},
	deletedIndex,
	viewport,
	isMobile = true,
	creatingContact = false,
	currentModel = 'c01',
	editing = false,
	indexAfterDelete = 0,
	initialData = [
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

function findIndexAfterDelete (collection) {
	var currentContact;

	if (!collection.at(deletedIndex)) {

		if (deletedIndex === 0) {
			collection.trigger('addContact');
			currentContact = 0;
		} else {
			currentContact = deletedIndex - 1;
		}

	} else {
		currentContact = deletedIndex;
	}

	currentModel = collection.at(currentContact);
}

function checkScreenSize (collection) {
	if($(window).width() <= 525 ) {
		isMobile = true;
		$('.picked').removeClass('picked')
		$('.glyphicon-menu-left').closest('button').show();

		if($('#contact-view').is(':visible')){
			$('#contact-view').css({
				'display': 'block',
				'left': '100%'
			});
		}

	} else {
		isMobile = false;
		if(!$('#contact-list-column').is(':visible')){
			$('#contact-list-column').css({
				'display': 'block',
				'left': '0%'
			});
		}
		if(!$('#contact-view').is(':visible')){
			$('#contact-view').css({
				'display': 'block',
				'left': '0%'
			});
		}
		collection.get({cid: currentModel}).trigger('notMobile');
		$('.glyphicon-menu-left').closest('button').hide();
	}
}