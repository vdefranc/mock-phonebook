var phonebook = window.phonebook || (function () {

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