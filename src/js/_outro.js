$(document).ready(function () {
	function resizeSearchBar () {
		$('.top-bar').innerWidth($('.top-bar').parent().innerWidth());
	}

	new App.List();
	resizeSearchBar();

	window.onresize = resizeSearchBar;
});

return App;

})();