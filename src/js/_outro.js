$(document).ready(function () {
	function resizeSearchBar () {
		$('.top-bar').innerWidth($('.top-bar').parent().innerWidth());
	}

	var collection = new App.List();
	resizeSearchBar();
	checkScreenSize(collection);
	
	$(window).resize(function() {
		checkScreenSize(collection);
		resizeSearchBar();
	});

});

return App;

})();