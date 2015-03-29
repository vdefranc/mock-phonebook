$(document).ready(function () {
	function resizeSearchBar () {
		$('.top-bar').innerWidth($('.top-bar').parent().innerWidth());
	}

	// initiates app
	var collection = new App.List();

	// inital checks
	resizeSearchBar();
	checkScreenSize(collection);
	
	$(window).resize(function() {
		checkScreenSize(collection);
		resizeSearchBar();
	});

});

return App;

})();