var phonebook = window.phonebook || (function () {

var currentContact = 0,
	editing = false;

var currentModel = 0;
var viewport;
var creatingContact = false;
var deletedIndex;
var indexAfterDelete = 0;
var findIndexAfterDelete = function (collection) {

		if (!collection.at(deletedIndex)) {
			if(deletedIndex === 0) {
				collection.trigger('addContact');
				console.log('ahh');
				indexAfterDelete = 0;
			} else {
				indexAfterDelete = deletedIndex - 1;
			}
		} else {
			indexAfterDelete = deletedIndex;
		}

		console.log('deleted ', deletedIndex);
		console.log('index after ', indexAfterDelete);
		console.log(collection);
}