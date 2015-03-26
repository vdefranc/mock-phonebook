var phonebook = window.phonebook || (function () {

var currentContact = 0,
	editing = false;

var currentModel = 0;
var viewport;
var creatingContact = false;