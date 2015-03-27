$(document).ready(function () {
	var app = new ContactCollection();


	resizeBar();
	window.onresize = resizeBar;
});

})();

function resizeBar() {
	$('.top-bar').outerWidth($('.top-bar').parent().innerWidth());
}