$(document).ready(function () {
	function resizeSearchBar () {
		$('.top-bar').innerWidth($('.top-bar').parent().innerWidth());
	}

	var collection = new App.List();
	resizeSearchBar();
	checkScreenSize(collection);
	
	$(window).resize(function() {
		resizeSearchBar();
		checkScreenSize(collection);
	});

});

return App;

})();