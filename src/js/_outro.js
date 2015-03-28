$(document).ready(function () {
	var car = new App.ContactCollection();


	resizeBar();
	window.onresize = resizeBar;
});

return App;

})();

function resizeBar() {
	$('.top-bar').innerWidth($('.top-bar').parent().innerWidth());
}