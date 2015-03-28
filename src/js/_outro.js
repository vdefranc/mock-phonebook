$(document).ready(function () {
	new App.List();

	resizeBar();
	window.onresize = resizeBar;

	function resizeBar() {
		$('.top-bar').innerWidth($('.top-bar').parent().innerWidth());
	}
});

return App;

})();